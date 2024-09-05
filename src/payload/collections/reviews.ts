import type { CollectionConfig } from 'payload';

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'name',
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
    {
      name: 'stars',
      type: 'number',
      required: true,
      max: 5,
      min: 0,
    },
  ],
};
