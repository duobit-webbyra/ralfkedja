import type { CollectionConfig } from 'payload';
import { isHost } from '../access/is-host';
import { isAdmin } from '../access/is-admin';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  defaultSort: 'role',
  access: {
    // read: ({ req: { user } }) => {
    //   if (!user) return false;
    //   if (user.role === 'host') return true;
    //   return false;
    // },
    // create: isHost,
    // update: isHost,
    admin({ req }) {
      return isAdmin({ req });
    },
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'radio',
      required: true,
      options: [
        {
          label: 'Host',
          value: 'host',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
    },
  ],
};
