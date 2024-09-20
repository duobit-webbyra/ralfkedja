import type { CollectionConfig } from 'payload';

import { isAdmin } from '../access/is-admin';

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'feedback',
      type: 'textarea',
      required: true,
    },
  ],
};
