import type { GlobalConfig } from 'payload';
import { isAdmin } from '../access/is-admin';

export const Gallery: GlobalConfig = {
  slug: 'gallery',

  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
};
