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

  if (!process.env.RESEND_API_KEY) {
    console.error('[sendEmail] RESEND_API_KEY not set')
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
      from: 'noreply@mail.ralfkedja.se',
      to: data.email,
      replyTo: email,
      subject: subject,
      html,
    })
    console.log('[sendEmail] Email sent successfully')
    return { status: 'success' }
  } catch (err) {
    console.error('[sendEmail] Failed to send email:', err)
    return { status: 'error', message: 'Failed to send email' }
  }
}

export async function sendCourseInquiry(previousState: any, formData: FormData) {
  try {
    console.log('[sendCourseInquiry] Starting course inquiry submission')
    
    // Verify Turnstile first (if you still want it)
    const turnstileToken = formData.get('cf-turnstile-response')?.toString()
    if (!turnstileToken) return { status: 'error', message: 'No Turnstile token' }

    if (!process.env.RESEND_API_KEY) {
      console.error('[sendCourseInquiry] RESEND_API_KEY not set')
      return { status: 'error', message: 'Email service not configured' }
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    console.log('[sendCourseInquiry] Resend initialized')

    // Fetch contact email from Payload
    console.log('[sendCourseInquiry] Initializing Payload')
    const payload = await getPayload({ config })
    console.log('[sendCourseInquiry] Fetching contact global')
    const data = await payload.findGlobal({ slug: 'contact' })
    if (!data || !data.email) throw new Error('Failed to get contact information')
    console.log('[sendCourseInquiry] Contact email:', data.email)

    const name = formData.get('name')?.toString() || ''
    const email = formData.get('email')?.toString() || ''
    const phone = formData.get('phone')?.toString() || ''
    const options = formData.getAll('options').map((o) => o.toString())
    const preferred_location = formData.get('preferred_location')?.toString() || ''
    const message = formData.get('message')?.toString() || ''

    console.log('[sendCourseInquiry] Form data extracted:', { email, options, preferred_location })

    if (!email || options.length === 0) return { status: 'error', message: 'Missing required fields' }

  const courseToCategory: Record<string, string> = {
    'Biomagnetism steg 1-2': 'biomagnetism',
    'Touch for Health steg 1-4': 'touch-for-health',
    'Grundkurs i kinesiologi/muskeltestning': 'kinesiologi',
  }

  const categorySlugs = ['general', ...options.map((o) => courseToCategory[o])]
  console.log('[sendCourseInquiry] Looking for categories with slugs:', categorySlugs)

  const categoriesRes = await payload.find({
    collection: 'subscriber-categories',
    where: { slug: { in: categorySlugs } },
    limit: 100,
  })
  
  console.log('[sendCourseInquiry] Found', categoriesRes.docs.length, 'categories')

  const categoriesToAdd = categoriesRes.docs

  console.log('[sendCourseInquiry] Checking for existing subscriber:', email)
  const existing = await payload.find({
    collection: 'subscribers',
    where: { email: { equals: email } },
    limit: 1,
  })
  
  console.log('[sendCourseInquiry] Existing subscriber docs:', existing.totalDocs)

  if (existing.totalDocs > 0) {
    // Uppdatera befintlig subscriber
    console.log('[sendCourseInquiry] Updating existing subscriber')
    const subscriber = existing.docs[0]
    const updatedCategories = Array.from(
      new Set([...(subscriber.categories || []), ...categoriesToAdd]),
    )

    await payload.update({
      collection: 'subscribers',
      id: subscriber.id,
      data: { categories: updatedCategories },
    })
    console.log('[sendCourseInquiry] Subscriber updated')
  } else {
    // Skapa ny subscriber
    console.log('[sendCourseInquiry] Creating new subscriber')
    const unsubscribeToken = crypto.randomBytes(20).toString('hex')
    await payload.create({
      collection: 'subscribers',
      data: {
        email,
        unsubscribeToken,
        categories: categoriesToAdd,
      },
    })
    console.log('[sendCourseInquiry] Subscriber created')
  }

  const html = generateCourseInquiryEmail({
    name,
    email,
    phone,
    options,
    preferred_location,
    message,
  })
  
  console.log('[sendCourseInquiry] HTML email generated, attempting to send')

    try {
      await resend.emails.send({
        from: 'noreply@mail.ralfkedja.se',
        to: data.email,
        replyTo: email,
        subject: 'Ny intresseanmälan för kurser',
        html,
      })
      console.log('[sendCourseInquiry] Email sent successfully')
      return { status: 'success' }
    } catch (err) {
      console.error('[sendCourseInquiry] Failed to send email:', err)
      return { status: 'error', message: 'Failed to send email' }
    }
  } catch (err) {
    console.error('[sendCourseInquiry] Unexpected error:', err)
    const errorMsg = err instanceof Error ? err.message : 'Unknown error'
    console.error('[sendCourseInquiry] Full error:', err)
    return { status: 'error', message: `Error: ${errorMsg}` }
  }
}
