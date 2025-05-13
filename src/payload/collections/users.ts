import type { CollectionConfig } from 'payload';
import { isHost } from '../access/is-host';
import { isAdmin } from '../access/is-admin';
import { ValidationError, CollectionBeforeValidateHook } from 'payload';

const validatePassword: CollectionBeforeValidateHook = ({ data }) => {
  const password = data?.password;

  let message: string | undefined = undefined;
  if (!password) message = 'Password is required.';
  else if (password.length <= 6) message = 'Password must be at least 6 characters long';

  const hasUpperCase = /[A-Z]/.test(password || '');
  const hasLowerCase = /[a-z]/.test(password || '');
  const hasNumber = /\d/.test(password || '');

  if (password && (!hasUpperCase || !hasLowerCase))
    message = 'Password must have both uppercase and lowercase letters';
  else if (password && !hasNumber) message = 'Password must contain at least one number';

  if (message) throw new ValidationError({ errors: [{ message, path: 'password' }] });
};

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
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
  auth: {
    tokenExpiration: 172800, // 2 days
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
  },
  hooks: {
    beforeValidate: [validatePassword],
  },
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
