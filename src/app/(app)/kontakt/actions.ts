'use server'

import nodemailer from 'nodemailer'
import config from '@payload-config'
import { getPayload } from 'payload'
import {
  generateContactEmail,
  generateCourseInquiryEmail,
} from '@/app/components/utils/generate-contact-email'
import { Resend } from 'resend'
import crypto from 'crypto'

interface CloudflareValidation {
  success: boolean
}

export async function verifyTurnstile(previousState: any, formData: FormData) {
  const turnstileToken = formData.get('cf-turnstile-response')

  if (!turnstileToken) {
    return { message: 'No Turnstile token', status: 'error' }
  }

  const params = new URLSearchParams()
  params.append('secret', process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY!)
  params.append('response', turnstileToken.toString())

  const verificationResponse = await fetch(
    'https://challenges.cloudflare.com/cdn-cgi/challenge-platform/h/b/flow/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    },
  )

  const verificationData: CloudflareValidation = await verificationResponse.json()

  if (!verificationData.success) {
    return { message: 'Verification failed', status: 'error' }
  }

  return { message: 'Verification successful', status: 'success' }
}

export async function sendEmail(previousState: any, formData: FormData) {
  // Verify Turnstile first (if you still want it)
  const turnstileToken = formData.get('cf-turnstile-response')?.toString()
  if (!turnstileToken) return { status: 'error', message: 'No Turnstile token' }

  if (!process.env.RESEND_API_KEY) {
    return { status: 'error', message: 'Email service not configured' }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  // Fetch contact email from Payload
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({ slug: 'contact' })
  if (!data || !data.email) throw new Error('Failed to get contact information')

  // Extract form fields
  const name = formData.get('name')?.toString() || ''
  const email = formData.get('email')?.toString() || ''
  const phone = formData.get('phone')?.toString() || ''
  const subject = formData.get('subject')?.toString() || ''
  const message = formData.get('message')?.toString() || ''

  const html = generateContactEmail({ name, email, phone, subject, message })

  // Send email with Resend
  try {
    await resend.emails.send({
      from: 'Ralf Kedja <noreply@mail.ralfkedja.se>',
      to: data.email,
      replyTo: email,
      subject: subject,
      html,
    })
    return { status: 'success' }
  } catch (err) {
    return { status: 'error', message: 'Failed to send email' }
  }
}

export async function sendCourseInquiry(previousState: any, formData: FormData) {
  try {
    // 1. Turnstile
    const turnstileToken = formData.get('cf-turnstile-response')?.toString()
    if (!turnstileToken) {
      return {
        status: 'error',
        message: 'Verifiering misslyckades. Försök igen.',
      }
    }

    // 2. Konfiguration
    if (!process.env.RESEND_API_KEY) {
      console.error('[sendCourseInquiry] RESEND_API_KEY saknas')
      return {
        status: 'error',
        message: 'Tjänsten är tillfälligt otillgänglig. Försök igen senare.',
      }
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // 3. Hämta mottagaradress
    const payload = await getPayload({ config })
    const data = await payload.findGlobal({ slug: 'contact' })

    if (!data?.email) {
      console.error('[sendCourseInquiry] Kontaktadress saknas i Payload')
      return {
        status: 'error',
        message: 'Tjänsten är tillfälligt otillgänglig. Försök igen senare.',
      }
    }

    // 4. Läs formulärdata
    const name = formData.get('name')?.toString().trim() || ''
    const email = formData.get('email')?.toString().trim() || ''
    const phone = formData.get('phone')?.toString().trim() || ''
    const options = formData.getAll('options').map((o) => o.toString())
    const preferred_location = formData.get('preferred_location')?.toString() || ''
    const message = formData.get('message')?.toString() || ''
    const emailConsent = formData.get('email_consent')

    // 5. Server-side validering
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

    // 6. Kurs → kategori
    const courseToCategory: Record<string, string> = {
      'Biomagnetism steg 1-2': 'biomagnetism',
      'Touch for Health steg 1-4': 'touch-for-health',
      'Grundkurs i kinesiologi/muskeltestning': 'kinesiologi',
    }

    const categorySlugs = ['general', ...options.map((o) => courseToCategory[o]).filter(Boolean)]

    // 7. Hämta kategorier
    const categoriesRes = await payload.find({
      collection: 'subscriber-categories',
      where: { slug: { in: categorySlugs } },
      limit: 100,
    })

    const categoriesToAdd = categoriesRes.docs

    // 8. Skapa / uppdatera subscriber
    const existing = await payload.find({
      collection: 'subscribers',
      where: { email: { equals: email } },
      limit: 1,
    })

    if (existing.totalDocs > 0) {
      const subscriber = existing.docs[0]
      const updatedCategories = Array.from(
        new Set([...(subscriber.categories || []), ...categoriesToAdd]),
      )

      await payload.update({
        collection: 'subscribers',
        id: subscriber.id,
        data: { categories: updatedCategories },
      })
    } else {
      const unsubscribeToken = crypto.randomBytes(20).toString('hex')

      await payload.create({
        collection: 'subscribers',
        data: {
          email,
          unsubscribeToken,
          categories: categoriesToAdd,
        },
      })
    }

    // 9. Skicka mejl
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
        from: 'Ralf Kedja <noreply@mail.ralfkedja.se>',
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
