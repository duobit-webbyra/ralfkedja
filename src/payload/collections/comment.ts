import { CollectionConfig } from "payload";
import { isAdmin } from "../access/is-admin";

export const Comments: CollectionConfig = {
  slug: 'comments',
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      label: 'Post',
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      label: 'Kommentar',
      maxLength: 1000,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Författare',
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        disabled: true,
      },
      hooks: {
        beforeChange: [({ value }) => value || new Date().toISOString()],
      },
    },
    {
      name: 'likes', // Add likes for comments
      type: 'array',
      label: 'Likes',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users', // Reference to the users collection
          required: true,
        },
      ],
    },
  ]
}
