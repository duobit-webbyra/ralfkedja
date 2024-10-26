import { withPayload } from '@payloadcms/next/withPayload';

import path from 'path';
const __dirname = process.cwd();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'app', 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.ralfkedja.se',
        port: '',
      },
    ],
  },
};

export default withPayload(nextConfig);
