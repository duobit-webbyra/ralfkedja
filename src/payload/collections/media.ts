import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/is-admin'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticURL: 'https://pub-93ba30fcaa484171b792d3d22c7ef793.r2.dev',
  },
}
