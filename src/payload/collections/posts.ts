import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/is-admin'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'createdAt'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titel',
      maxLength: 250,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Innehåll',
      maxLength: 5000,
    },
    {
      name: 'likes',
      type: 'array',
      interfaceName: 'Likes',
      label: 'Likes',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          required: true,
        },
      ],
    },
    {
      name: 'comments',
      type: 'join',
      label: 'Kommentarer',
      collection: 'comments',
      on: 'post'
    },
  ],
}
