'use client'

import Script from 'next/script'

export default function Turnstile() {
  return (
    <>
      <Script async defer src="https://challenges.cloudflare.com/turnstile/v0/api.js" />

      <div
        className="cf-turnstile"
        data-sitekey={String(process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY)}
      />
    </>
  )
}
