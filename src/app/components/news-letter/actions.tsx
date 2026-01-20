'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import crypto from 'crypto'
import { Resend } from 'resend'
import { headers } from 'next/headers'

interface TurnstileResponse {
  success: boolean
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
}

// Helper function to verify Turnstile
async function verifyTurnstile(token: string | null): Promise<boolean> {
  if (!token) return false

  const headerStorage = await headers()
  const remoteIp = headerStorage.get('CF-Connecting-IP') || headerStorage.get('X-Forwarded-For')

  try {
    const verificationResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        body: JSON.stringify({
          response: token,
          secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
          remoteIp,
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      },
    )

    const verificationData = (await verificationResponse.json()) as TurnstileResponse
    return verificationData.success
  } catch (e) {
    console.error('Turnstile validation error:', e)
    return false
  }
}

// Helper to get or create category
async function getOrCreateCategory(payload: any, slug: string, name: string, description: string) {
  const existing = await payload.find({
    collection: 'subscriber-categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    return existing.docs[0]
  }

  return await payload.create({
    collection: 'subscriber-categories',
    data: { name, slug, description },
  })
}

// Helper to add subscriber to categories (idempotent)
async function addSubscriberToCategories(
  payload: any,
  email: string,
  categoryIds: (string | number)[],
): Promise<{ isNew: boolean; subscriber: any; categoriesAdded: boolean }> {
  const existing = await payload.find({
    collection: 'subscribers',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    const subscriber = existing.docs[0]

    // Normalize current categories to IDs (could be objects or IDs)
    const currentCategoryIds = (subscriber.categories || []).map((c: any) =>
      typeof c === 'object' && c !== null ? c.id : c,
    )

    // Normalize incoming categoryIds to numbers/strings for comparison
    const newCategoryIds = categoryIds.map((id) => (typeof id === 'string' ? parseInt(id) : id))

    // Use Set to avoid duplicates
    const uniqueCategories = Array.from(new Set([...currentCategoryIds, ...newCategoryIds]))

    // Check if new categories were actually added
    const categoriesAdded = uniqueCategories.length > currentCategoryIds.length

    // Only update if there are new categories
    if (categoriesAdded) {
      await payload.update({
        collection: 'subscribers',
        id: subscriber.id,
        data: { categories: uniqueCategories },
      })
    }

    return { isNew: false, subscriber, categoriesAdded }
  }

  // Create new subscriber
  const unsubscribeToken = crypto.randomBytes(16).toString('hex')
  const subscriber = await payload.create({
    collection: 'subscribers',
    data: {
      email,
      unsubscribeToken,
      categories: categoryIds,
    },
  })

  return { isNew: true, subscriber, categoriesAdded: true }
}

export async function addGeneralSubscriber(
  prevState: { message: string },
  formData: FormData,
): Promise<{ message: string }> {
  try {
    // 1. Verify Turnstile
    const turnstileToken = formData.get('cf-turnstile-response')?.toString()
    const isValid = await verifyTurnstile(turnstileToken)

    if (!isValid) {
      return { message: 'Error: Säkerhetsverifiering misslyckades. Försök igen.' }
    }

    // 2. Check Resend API
    if (!process.env.RESEND_API_KEY) {
      return { message: 'Error: Email service not configured' }
    }

    const payload = await getPayload({ config })
    const email = formData.get('email')?.toString().trim().toLowerCase()

    if (!email) {
      return { message: 'Error: E-postadress krävs.' }
    }

    // 3. Get or create general category
    const category = await getOrCreateCategory(
      payload,
      'general',
      'Generell nyhetsbrevsprenumerant',
      'Skickas till alla prenumeranter.',
    )

    // 4. Add subscriber (idempotent)
    const { isNew, subscriber, categoriesAdded } = await addSubscriberToCategories(payload, email, [
      category.id,
    ])

    // 5. Send welcome email only for new subscribers
    if (isNew) {
      await sendWelcomeEmail(email, subscriber.unsubscribeToken)
      return { message: 'Tack! Du är nu prenumerant.' }
    }

    // If subscriber exists but was added to this category
    if (categoriesAdded) {
      return { message: 'Prenumerationen har uppdaterats!' }
    }

    return { message: 'Du prenumererar redan på nyhetsbrevet.' }
  } catch (err) {
    console.error('[addGeneralSubscriber] Error:', err)
    return { message: 'Error: Ett fel uppstod. Försök igen senare.' }
  }
}

export async function sendWelcomeEmail(email: string, unsubscribeToken: string) {
  if (!process.env.RESEND_API_KEY) return

  const resend = new Resend(process.env.RESEND_API_KEY)
  const unsubscribeBase = `${process.env.NEXT_PUBLIC_APP_URL}/nyhetsbrev-avregistrering/`

  try {
    await resend.emails.send({
      from: 'Nyhetsbrev - Ralf Kedja <noreply@mail.ralfkedja.se>',
      to: email,
      replyTo: 'Ralf Kedja <ralked@hotmail.com>',
      subject: 'Tack för din prenumeration på Ralf Kedjas nyhetsbrev!',
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5;color:#333;">
          <h2 style="color:#111;">Hej!</h2>
          <p>Tack för att du har registrerat dig till Ralf Kedjas nyhetsbrev. 
          Här kommer du få de senaste nyheterna, uppdateringarna och erbjudanden direkt till din mejl.</p>

          <p>Jag ser fram emot att hålla dig uppdaterad!</p>

          <hr style="margin:20px 0;" />

          <p style="font-size:12px;color:#666;">
            Du får detta mejl eftersom du registrerat dig för mitt nyhetsbrev.
            Om du vill avsluta prenumerationen kan du klicka på länken nedan:
            <br />
            <a href="${unsubscribeBase}${unsubscribeToken}" style="color:#1a73e8;">Avsluta prenumeration</a>
          </p>
        </div>
      `,
    })
  } catch (err) {
    return { message: 'Error: Ett fel uppstod. Försök igen senare.' }
  }
}
