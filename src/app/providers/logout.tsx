'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  try {
    const cookieStore = await cookies()

    // Get the current token
    const token = cookieStore.get('payload-token')?.value

    if (token) {
      cookieStore.delete('payload-token')
      return { success: true }
    }

    // Delete the auth cookie
    return { success: false, message: 'Not logged in' }
  } catch (error) {
    console.error('Logout error:', error)

    // Still delete the cookie even if logout fails
    ;(await cookies()).delete('payload-token')

    return { success: false, error: 'Ett fel uppstod vid utloggning.' }
  }
}

// Optional: Version with redirect
export async function logoutAndRedirect() {
  await logout()
  redirect('/')
}
