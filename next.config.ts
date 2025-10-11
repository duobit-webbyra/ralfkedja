import { withPayload } from '@payloadcms/next/withPayload'
import { NextConfig } from 'next'

import path from 'path'
const __dirname = process.cwd()

const mediaHostname = process.env.NEXT_PUBLIC_MEDIA_URL
  ? new URL(process.env.NEXT_PUBLIC_MEDIA_URL).hostname
  : null

const remotePatterns: Array<{
  protocol: 'https'
  hostname: string
  port?: string
}> = [
  {
    protocol: 'https',
    hostname: 'img.youtube.com',
    port: '',
  },
]

if (mediaHostname) {
  remotePatterns.push({
    protocol: 'https',
    hostname: mediaHostname,
  })
}

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Your Next.js config here
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'app', 'styles')],
  },
  images: {
    unoptimized: true,
    remotePatterns,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
