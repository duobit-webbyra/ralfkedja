import { GlobalConfig } from 'payload';

export const Announcement: GlobalConfig = {
  slug: 'announcement',
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
