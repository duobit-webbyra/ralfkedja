'use server'

import nodemailer from 'nodemailer'
import config from '@payload-config'
import { getPayload } from 'payload'
import {
  generateContactEmail,
  generateCourseInquiryEmail,
} from '@/app/components/utils/generate-contact-email'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

interface CloudflareValidation {
  success: boolean
}

export async function verifyTurnstile(previousState: any, formData: FormData) {
  const turnstileToken = formData.get('cf-turnstile-response')
  console.log('FormData cf-turnstile-response:', formData.get('cf-turnstile-response'))

  console.log('Turnstile token received:', turnstileToken) // <-- check this

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
  console.log('Turnstile verification response:', verificationData)

  if (!verificationData.success) {
    return { message: 'Verification failed', status: 'error' }
  }

  return { message: 'Verification successful', status: 'success' }
}

export async function sendEmail(previousState: any, formData: FormData) {
  // Verify Turnstile first (if you still want it)
  const turnstileToken = formData.get('cf-turnstile-response')?.toString()
  if (!turnstileToken) return { status: 'error', message: 'No Turnstile token' }

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
  await resend.emails.send({
    from: process.env.EMAIL_USER!, // Your Gmail or verified sender in Resend
    to: data.email, // Payload contact email
    replyTo: email,
    subject: subject,
    html,
  })

  return { status: 'success' }
}

export async function sendCourseInquiry(previousState: any, formData: FormData) {
  const verification = await verifyTurnstile(previousState, formData)
  if (verification.status !== 'success') return verification

  const payload = await getPayload({ config })
  const data = await payload.findGlobal({ slug: 'contact' })
  if (!data || !data.email) throw new Error('Failed to get course inquiry contact information')

  const name = formData.get('name')?.toString() || ''
  const email = formData.get('email')?.toString() || ''
  const phone = formData.get('phone')?.toString() || ''
  const options = formData.getAll('options').map((o) => o.toString())
  const preferred_location = formData.get('preferred_location')?.toString() || ''
  const message = formData.get('message')?.toString() || ''

  if (!email || options.length === 0) return { status: 'error', message: 'Missing required fields' }

  const html = generateCourseInquiryEmail({
    name,
    email,
    phone,
    options,
    preferred_location,
    message,
  })

  await resend.emails.send({
    from: process.env.EMAIL_USER!,
    to: data.email,
    replyTo: email,
    subject: 'Ny intresseanmälan för kurser',
    html,
  })

  return { status: 'success' }
}
