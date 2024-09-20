import { GlobalConfig } from 'payload';
import { isAdmin } from '../access/is-admin';

export const Contact: GlobalConfig = {
  slug: 'contact',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'street',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'zipcode',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'links',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'booking',
          type: 'text',
        },
      ],
    },
  ],
};
