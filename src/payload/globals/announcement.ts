import { GlobalConfig } from 'payload';
import { isAdmin } from '../access/is-admin';

export const Announcement: GlobalConfig = {
  slug: 'announcement',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'activate',
      type: 'checkbox',
    },
    {
      name: 'message',
      type: 'text',
    },
  ],
};
