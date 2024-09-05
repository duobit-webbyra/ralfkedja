import { GlobalConfig } from 'payload';

export const HighlightReviews: GlobalConfig = {
  slug: 'highlight-reviews',
  fields: [
    {
      name: 'reviews',
      type: 'group',
      fields: [
        {
          name: 'review-one',
          type: 'relationship',
          relationTo: 'reviews',
        },
        {
          name: 'review-two',
          type: 'relationship',
          relationTo: 'reviews',
        },
        {
          name: 'review-three',
          type: 'relationship',
          relationTo: 'reviews',
        },
      ],
    },
  ],
};
