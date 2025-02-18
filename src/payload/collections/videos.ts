import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/is-admin';

export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
  },

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
