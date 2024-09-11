import { withPayload } from '@payloadcms/next/withPayload';

import path from 'path';
const __dirname = process.cwd();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'app', 'styles')],
  },
};

export default withPayload(nextConfig);
