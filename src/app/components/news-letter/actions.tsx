'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import crypto from 'crypto'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function addGeneralSubscriber(formData: FormData): Promise<{ message: string }> {
  const payload = await getPayload({ config })
  const email = formData.get('email')?.toString().trim().toLowerCase()
  if (!email) {
    return { message: 'E-postadress krävs.' }
  }

  let category
  try {
    const existing = await payload.find({
      collection: 'subscriber-categories',
      where: { slug: { equals: 'general' } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      category = existing.docs[0]
    } else {
      category = await payload.create({
        collection: 'subscriber-categories',
        data: {
          name: 'Generell nyhetsbrevsprenumerant',
          slug: 'general',
          description: 'Skickas till alla prenumeranter.',
        },
      })
    }
  } catch (err) {
    console.error('[addGeneralSubscriber] Error ensuring general category:', err)
    return { message: 'Kunde inte skapa eller hitta kategori.' }
  }

  // 2️⃣ Generate unsubscribe token
  const unsubscribeToken = crypto.randomBytes(16).toString('hex')

  // 3️⃣ Create or update subscriber
  try {
    const existingSub = await payload.find({
      collection: 'subscribers',
      where: { email: { equals: email } },
      limit: 1,
    })

    if (existingSub.docs.length > 0) {
      const sub = existingSub.docs[0]
      const hasCategory = sub.categories?.some(
        (c: any) => c.id === category.id || c === category.id,
      )

      if (!hasCategory) {
        await payload.update({
          collection: 'subscribers',
          id: sub.id,
          data: { categories: [...(sub.categories || []), category.id] },
        })
        return { message: 'Prenumerationen har uppdaterats!' }
      }

      return { message: 'Du prenumererar redan på nyhetsbrevet.' }
    }

    await payload.create({
      collection: 'subscribers',
      data: {
        email,
        unsubscribeToken,
        categories: [category.id],
      },
    })

    await sendWelcomeEmail(email, unsubscribeToken)
    return { message: 'Tack! Du är nu prenumerant.' }
  } catch (err) {
    console.error('[addGeneralSubscriber] Error creating subscriber:', err)
    return { message: 'Ett fel uppstod. Försök igen senare.' }
  }
}

export async function sendWelcomeEmail(email: string, unsubscribeToken: string) {
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
    console.log('[sendWelcomeEmail] Skickat till:', email)
  } catch (err) {
    console.error('[sendWelcomeEmail] Fel vid skick:', email, err)
  }
}
