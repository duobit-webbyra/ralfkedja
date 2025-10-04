'use server'

import nodemailer from 'nodemailer'
import config from '@payload-config'
import { getPayload } from 'payload'

interface CloudflareValidation {
  success: boolean
}

export async function verifyTurnstile(previousState: any, formData: FormData) {
  const turnstileToken = formData.get('cf-turnstile-response')
  const verificationResponse = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      body: JSON.stringify({
        response: turnstileToken,
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  )

  const verificationData: CloudflareValidation = await verificationResponse.json()

  if (!verificationData.success) {
    return {
      message: 'Något gick fel. Försök igen senare',
      status: 'error',
    }
  }

  return {
    message: 'Verification successful',
    status: 'success',
  }
}

export async function sendEmail(previousState: any, formData: FormData) {
  const turnstileToken = formData.get('cf-turnstile-response')
  const verificationResponse = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      body: JSON.stringify({
        response: turnstileToken,
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  )

  const verificationData: CloudflareValidation = await verificationResponse.json()

  if (!verificationData.success) {
    console.log('Verification failed:', verificationData)
    return {
      message: 'Något gick fel. Försök igen senare',
      status: 'error',
    }
  }
  if (verificationData.success) {
    console.log('Verification successful:', verificationData)
  }

  const payload = await getPayload({ config })
  const data = await payload.findGlobal({
    slug: 'contact',
  })

  if (!data || !data.email) throw new Error('Failed to get contact information')

  const name = formData.get('name')
  const email = formData.get('email')
  const phone = formData.get('phone')
  const subject = formData.get('subject')
  const message = formData.get('message')

  if (!email || !subject) return false

  const user = process.env.EMAIL_USER
  const password = process.env.EMAIL_PASS

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: password,
    },
  })

  try {
    transporter.sendMail({
      from: user,
      to: data.email,
      replyTo: email.toString(),
      subject: subject.toString(),
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Ny Kundkontakt</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Namn:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>E-mail:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Telefon:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Ämne:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${subject}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Meddelande:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
          </tr>
        </table>
      </div>
    `,
    })
  } catch (e) {
    throw new Error('Failed to send email')
  }
}

export async function sendCourseInquiry(previousState: any, formData: FormData) {
  const turnstileToken = formData.get('cf-turnstile-response')
  const verificationResponse = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      body: JSON.stringify({
        response: turnstileToken,
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  )

  const verificationData: CloudflareValidation = await verificationResponse.json()
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({
    slug: 'contact',
  })

  if (!verificationData.success) {
    return {
      message: 'Något gick fel. Försök igen senare',
      status: 'error',
    }
  }

  if (!data || !data.email) throw new Error('Failed to get course inquiry contact information')

  const name = formData.get('name')
  const email = formData.get('email')
  const phone = formData.get('phone')
  const options = formData.getAll('options')
  const preferred_location = formData.get('preferred_location')
  const message = formData.get('message')

  if (!email || options.length === 0) return false

  const user = process.env.EMAIL_USER
  const password = process.env.EMAIL_PASS

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: password,
    },
  })

  try {
    transporter.sendMail({
      from: user,
      to: data.email,
      replyTo: email.toString(),
      subject: 'Ny intresseanmälan för kurser',
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Ny intresseanmälan för kurser</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Namn:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>E-mail:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Telefon:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Intresserad av:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${options.map((option) => option).join('<br>')}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Plats:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${preferred_location}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Övrigt meddelande:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
          </tr>
        </table>
      </div>
    `,
    })
  } catch (e) {
    throw new Error('Failed to send course inquiry email')
  }
}
