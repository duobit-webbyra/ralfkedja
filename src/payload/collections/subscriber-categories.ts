import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/is-admin'
export const SubscriberCategories: CollectionConfig = {
  slug: 'subscriber-categories',
  labels: {
    singular: 'Kategori',
    plural: 'Kategorier',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Används som nyckel (ex: kurs_a, general, kurs_c)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
