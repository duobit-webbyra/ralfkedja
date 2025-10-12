import type { CollectionConfig } from 'payload'
import { Resend } from 'resend'
import { sendNewsletterHook } from '../hooks/send-news-letter'
import { isAdmin } from '../access/is-admin'

export const Newsletters: CollectionConfig = {
  slug: 'newsletters',
  labels: {
    singular: 'Utskick',
    plural: 'Utskick',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'sendTo', 'status', 'content', 'createdAt'],
  },
  fields: [
    {
      name: 'subject',
      type: 'text',
      required: true,
      label: 'Ämne',
    },
    {
      name: 'sendTo',
      label: 'Skicka till kategorier',
      type: 'relationship',
      relationTo: 'subscriber-categories',
      hasMany: true,
      required: true,
    },
    {
      name: 'content',
      label: 'Innehåll',
      type: 'richText',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Utkast', value: 'draft' },
        { label: 'Skickat', value: 'sent' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [sendNewsletterHook],
  },
}
