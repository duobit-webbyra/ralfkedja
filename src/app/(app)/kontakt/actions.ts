'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import {
  generateContactEmail,
  generateCourseInquiryEmail,
} from '@/app/components/utils/generate-contact-email'
import { Resend } from 'resend'
import crypto from 'crypto'
import { headers } from 'next/headers'

interface TurnstileResponse {
  success: boolean
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
}

// ============================================================================
// SHARED UTILITIES
// ============================================================================

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

async function addSubscriberToCategories(
  payload: any,
  email: string,
  categoryIds: string[],
): Promise<{ isNew: boolean; subscriber: any }> {
  const existing = await payload.find({
    collection: 'subscribers',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    const subscriber = existing.docs[0]
    const currentCategoryIds = (subscriber.categories || []).map((c: any) =>
      typeof c === 'object' ? c.id : c,
    )

    // Use Set to avoid duplicates
    const uniqueCategories = Array.from(new Set([...currentCategoryIds, ...categoryIds]))

    // Only update if there are new categories
    if (uniqueCategories.length > currentCategoryIds.length) {
      await payload.update({
        collection: 'subscribers',
        id: subscriber.id,
        data: { categories: uniqueCategories },
      })
    }

    return { isNew: false, subscriber }
  }

  // Create new subscriber
  const unsubscribeToken = crypto.randomBytes(20).toString('hex')
  const subscriber = await payload.create({
    collection: 'subscribers',
    data: {
      email,
      unsubscribeToken,
      categories: categoryIds,
    },
  })

  return { isNew: true, subscriber }
}

// ============================================================================
// CONTACT FORM
// ============================================================================

export async function sendEmail(state: any, formData: FormData) {
  // 1. Verify Turnstile
  const turnstileToken = formData.get('cf-turnstile-response')?.toString()
  const isValid = await verifyTurnstile(turnstileToken)

  if (!isValid) {
    console.error('Turnstile verification failed')
    return {
      ...state,
      status: 'error',
      message: 'P1. Något gick fel. Försök igen senare',
    }
  }

  // 2. Check configuration
  if (!process.env.RESEND_API_KEY) {
    return { status: 'error', message: 'Email service not configured' }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  // 3. Fetch contact email from Payload
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({ slug: 'contact' })

  if (!data || !data.email) {
    console.error('Failed to get contact information')
    return { status: 'error', message: 'P2. Något gick fel. Försök igen senare' }
  }

  // 4. Extract form fields
  const name = formData.get('name')?.toString() || ''
  const email = formData.get('email')?.toString() || ''
  const phone = formData.get('phone')?.toString() || ''
  const subject = formData.get('subject')?.toString() || ''
  const message = formData.get('message')?.toString() || ''

  const html = generateContactEmail({ name, email, phone, subject, message })

  // 5. Send email with Resend
  try {
    await resend.emails.send({
      from: 'Ralf Kedja Kontakt <noreply@mail.ralfkedja.se>',
      to: data.email,
      replyTo: email,
      subject: subject,
      html,
    })
    return { status: 'success' }
  } catch (err) {
    console.error('[sendEmail] Failed to send email:', err)
    return { status: 'error', message: 'Failed to send email' }
  }
}

// ============================================================================
// COURSE INQUIRY
// ============================================================================

export async function sendCourseInquiry(state: any, formData: FormData) {
  try {
    // 1. Verify Turnstile
    const turnstileToken = formData.get('cf-turnstile-response')?.toString()
    const isValid = await verifyTurnstile(turnstileToken)

    if (!isValid) {
      console.error('Turnstile verification failed')
      return {
        ...state,
        status: 'error',
        message: 'P1. Något gick fel. Försök igen senare',
      }
    }

    // 2. Check configuration
    if (!process.env.RESEND_API_KEY) {
      console.error('[sendCourseInquiry] RESEND_API_KEY saknas')
      return {
        status: 'error',
        message: 'Tjänsten är tillfälligt otillgänglig. Försök igen senare.',
      }
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // 3. Fetch contact email
    const payload = await getPayload({ config })
    const data = await payload.findGlobal({ slug: 'contact' })

    if (!data?.email) {
      console.error('[sendCourseInquiry] Kontaktadress saknas i Payload')
      return {
        status: 'error',
        message: 'Tjänsten är tillfälligt otillgänglig. Försök igen senare.',
      }
    }

    // 4. Extract and validate form data
    const name = formData.get('name')?.toString().trim() || ''
    const email = formData.get('email')?.toString().trim() || ''
    const phone = formData.get('phone')?.toString().trim() || ''
    const options = formData.getAll('options').map((o) => o.toString())
    const preferred_location = formData.get('preferred_location')?.toString() || ''
    const message = formData.get('message')?.toString() || ''
    const emailConsent = formData.get('email_consent')

    // 5. Server-side validation
    if (!name || !email || !phone) {
      return {
        status: 'error',
        message: 'Alla obligatoriska fält måste fyllas i.',
      }
    }

    if (options.length === 0) {
      return {
        status: 'error',
        message: 'Du måste välja minst en kurs.',
      }
    }

    if (!emailConsent) {
      return {
        status: 'error',
        message: 'Du måste samtycka till att bli kontaktad via e-post.',
      }
    }

    // 6. Map courses to categories
    const courseToCategory: Record<string, string> = {
      'Biomagnetism steg 1-2': 'biomagnetism',
      'Touch for Health steg 1-4': 'touch-for-health',
      'Grundkurs i kinesiologi/muskeltestning': 'kinesiologi',
    }

    // Get category slugs for selected courses (no 'general' here)
    const courseCategorySlugs = options.map((o) => courseToCategory[o]).filter(Boolean)

    // 7. Get or create categories
    const categoryPromises = courseCategorySlugs.map((slug) => {
      const categoryNames: Record<string, string> = {
        biomagnetism: 'Biomagnetism',
        'touch-for-health': 'Touch for Health',
        kinesiologi: 'Kinesiologi',
      }
      return getOrCreateCategory(
        payload,
        slug,
        categoryNames[slug] || slug,
        `Prenumeranter intresserade av ${categoryNames[slug] || slug}`,
      )
    })

    const categories = await Promise.all(categoryPromises)
    const categoryIds = categories.map((c) => c.id)

    // 8. Add subscriber to course-specific categories only
    await addSubscriberToCategories(payload, email, categoryIds)

    // 9. Send inquiry email
    const html = generateCourseInquiryEmail({
      name,
      email,
      phone,
      options,
      preferred_location,
      message,
    })

    try {
      await resend.emails.send({
        from: 'Ralf Kedja Kurser <noreply@mail.ralfkedja.se>',
        to: data.email,
        replyTo: email,
        subject: 'Ny intresseanmälan för kurser',
        html,
      })
    } catch (err) {
      console.error('[sendCourseInquiry] Misslyckades att skicka e-post', err)
      return {
        status: 'error',
        message: 'Kunde inte skicka din intresseanmälan. Försök igen senare.',
      }
    }

    // 10. Success
    return {
      status: 'success',
      message: 'Tack! Din intresseanmälan har skickats.',
    }
  } catch (err) {
    console.error('[sendCourseInquiry] Oväntat fel', err)
    return {
      status: 'error',
      message: 'Ett oväntat fel inträffade. Försök igen senare.',
    }
  }
}
