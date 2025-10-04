'use server'

import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import { redirect } from 'next/navigation'

async function handleLogin(email: string, password: string) {
  try {
    const payload = await getPayload({ config })

    // Use Payload's login method directly
    const result = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
      req: {}, // You can pass additional request context if needed
    })

    // result contains: { token, user, exp }
    return {
      success: true,
      user: result.user,
      token: result.token,
    }
  } catch (error: any) {
    console.log('Login error:', error)

    // Extract error message
    const errorMessage = error.message || error.data?.message

    // Handle specific error messages
    if (errorMessage?.includes('incorrect') || errorMessage?.includes('Invalid')) {
      return {
        success: false,
        error: 'Felaktig e-post eller lösenord.',
      }
    }

    if (errorMessage?.includes('locked') || errorMessage?.includes('too many')) {
      return {
        success: false,
        error: 'För många misslyckade inloggningsförsök. Vänta och försök igen senare.',
      }
    }

    // Default error message
    return {
      success: false,
      error: 'Ett fel uppstod. Försök igen senare.',
    }
  }
}

export async function loginAction(previousState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const result = await handleLogin(email, password)

  if (!result.success) {
    return { error: result.error }
  }

  ;(await cookies()).set('payload-token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return redirect('/medlemssida')
}
