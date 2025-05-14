/* eslint no-unused-vars: "off" */
import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-mongodb';
undefined;

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Migration code
  payload.create({
    collection: 'users',
    data: {
      name: 'Kevin Hormiz',
      role: 'host',
      email: 'kevinhormiz@gmail.com',
      password: 'Natalie5685',
    },
  });
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
