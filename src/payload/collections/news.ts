import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/is-admin';

export const News: CollectionConfig = {
  slug: 'news',
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
      type: 'array',
      label: 'Kommentarer',
      fields: [
        {
          name: 'id',
          type: 'text',
          required: true,
        },
        {
          name: 'comment',
          type: 'textarea',
          required: true,
          label: 'Kommentar',
          maxLength: 1000,
        },
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
          required: true,
          label: 'Författare',
        },
        {
          name: 'createdAt',
          type: 'date',
          admin: {
            disabled: true,
          },
          hooks: {
            beforeChange: [({ value }) => value || new Date().toISOString()],
          },
        },
        {
          name: 'likes', // Add likes for comments
          type: 'array',
          label: 'Likes',
          fields: [
            {
              name: 'user',
              type: 'relationship',
              relationTo: 'users', // Reference to the users collection
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default News;
