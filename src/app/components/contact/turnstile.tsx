'use client';

import Script from 'next/script';
import { env } from 'next-runtime-env';

export default function Turnstile() {
  return (
    <>
      <Script async defer src='https://challenges.cloudflare.com/turnstile/v0/api.js' />

      <div
        className='cf-turnstile'
        data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
      />
    </>
  );
}
