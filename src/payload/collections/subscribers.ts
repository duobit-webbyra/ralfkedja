import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/is-admin'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'unsubscribeToken',
      type: 'text',
      required: true,
    },
    {
      name: 'categories',
      label: 'Prenumerationskategorier',
      type: 'relationship',
      relationTo: 'subscriber-categories',
      hasMany: true,
    },
  ],
}
