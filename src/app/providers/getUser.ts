'use server'

import { cookies, headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  if (!token) return null

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  return user
}
