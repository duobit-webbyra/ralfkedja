import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/is-admin';

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title', // Use the title field as the display title in the admin panel
    defaultColumns: ['title', 'author', 'createdAt'], // Default columns in the admin panel
  },
  access: {
    read: () => true, // Allow everyone to read news posts
    create: isAdmin, // Only admins can create posts
    update: isAdmin, // Only admins can update posts
    delete: isAdmin, // Only admins can delete posts
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
      name: 'author',
      type: 'text',
      required: true,
      label: 'Författare',
    },
    {
      name: 'comments',
      type: 'array',
      label: 'Kommentarer',
      fields: [
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
            disabled: true, // Automatically set the date, no need for manual input
          },
          hooks: {
            beforeChange: [
              ({ value }) => value || new Date().toISOString(), // Default to the current date
            ],
          },
        },
      ],
    },
  ],
};

export default News;
