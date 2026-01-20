'use client'

import Turnstile, { useTurnstile } from 'react-turnstile'

export default function TurnstileWidget() {
  return <Turnstile sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY} />
}
