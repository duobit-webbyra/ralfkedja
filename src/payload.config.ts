// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './payload/collections/users';
import { Media } from './payload/collections/media';
import { Gallery } from './payload/globals/gallery';
import { Reviews } from './payload/collections/reviews';
import { Contact } from './payload/globals/contact';
import { Videos } from './payload/collections/videos';
import { Announcement } from './payload/globals/announcement';
import { HighlightReviews } from './payload/globals/highlight-reviews';
import { s3Storage } from '@payloadcms/storage-s3';
import { News } from './payload/collections/news';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      graphics: {
        Logo: '/app/components/custom-logo#CustomLogo',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Media, Reviews, Users, Videos, News],
  globals: [Announcement, Contact, Gallery, HighlightReviews],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [
    ...(process.env.NODE_ENV === 'production'
      ? [
          s3Storage({
            collections: {
              media: {
                prefix: process.env?.S3_PAYLOAD_PREFIX,
              },
            },
            bucket: process.env?.S3_BUCKET || '',
            config: {
              endpoint: process.env?.S3_ENDPOINT,
              region: process.env.S3_REGION,
              credentials: {
                accessKeyId: process.env?.S3_ACCESS_KEY || '',
                secretAccessKey: process.env?.S3_SECRET_KEY || '',
              },
            },
            acl: 'public-read',
          }),
        ]
      : []),
  ],
});
