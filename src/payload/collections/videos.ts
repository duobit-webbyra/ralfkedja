import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/is-admin';

export const Videos: CollectionConfig = {
  slug: 'videos',
  access: {
    read: () => true,
    update: isAdmin,
  },
  auth: true,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
  ],
};
