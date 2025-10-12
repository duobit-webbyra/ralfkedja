// storage-adapter-import-placeholder
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'
import { Reviews } from './payload/collections/reviews'
import { Media } from './payload/collections/media'
import { Users } from './payload/collections/users'
import { Announcement } from './payload/globals/announcement'
import { Contact } from './payload/globals/contact'
import { Gallery } from './payload/globals/gallery'
import { HighlightReviews } from './payload/globals/highlight-reviews'
import { Posts } from './payload/collections/posts'
import { Videos } from './payload/collections/videos'
import { Comments } from './payload/collections/comment'
import { Subscribers } from './payload/collections/subscribers'
import { SubscriberCategories } from './payload/collections/subscriber-categories'
import { Newsletters } from './payload/collections/newsletters'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const cloudflareRemoteBindings = process.env.NODE_ENV === 'production'
const cloudflare =
  process.argv.find((value) => value.match(/^(generate|migrate):?/)) || !cloudflareRemoteBindings
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Comments,
    Posts,
    Videos,
    Reviews,
    Users,
    Media,
    Subscribers,
    SubscriberCategories,
    Newsletters,
  ],
  globals: [Announcement, Contact, Gallery, HighlightReviews],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({ binding: cloudflare.env.D1 }),
  plugins: [
    payloadCloudPlugin(),
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: {
        media: {
          generateFileURL: ({ filename }) => {
            const baseUrl = process.env.NEXT_PUBLIC_MEDIA_URL || ''
            return `${baseUrl}/${filename}`
          },
        },
      },
    }),
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        experimental: { remoteBindings: cloudflareRemoteBindings },
      } satisfies GetPlatformProxyOptions),
  )
}
