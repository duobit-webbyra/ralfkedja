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
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Innehåll',
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
        },
        {
          name: 'author',
          type: 'text',
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
      ],
    },
  ],
};

export default News;
