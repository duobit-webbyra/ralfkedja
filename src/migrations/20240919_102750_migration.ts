/* eslint no-unused-vars: "off" */
import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-mongodb';
undefined;

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Migration code
  payload.create({
    collection: 'users',
    data: {
      role: 'host',
      email: 'marwinhormiz@duobit.se',
      password: 'test123',
    },
  });
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
