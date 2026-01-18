import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`subscribers\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`email\` text NOT NULL UNIQUE,
    \`unsubscribe_token\` text NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  )`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`subscriber_categories\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`name\` text NOT NULL UNIQUE,
    \`slug\` text NOT NULL UNIQUE,
    \`description\` text,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  )`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`subscribers_categories\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`category_id\` integer NOT NULL,
    FOREIGN KEY (\`category_id\`) REFERENCES \`subscriber_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`subscribers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  )`)

  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`subscribers_email_idx\` ON \`subscribers\` (\`email\`)`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`subscribers_categories_order_idx\` ON \`subscribers_categories\` (\`_order\`)`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`subscribers_categories_parent_idx\` ON \`subscribers_categories\` (\`_parent_id\`)`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS \`subscribers_categories\``)
  await db.run(sql`DROP TABLE IF EXISTS \`subscribers\``)
  await db.run(sql`DROP TABLE IF EXISTS \`subscriber_categories\``)
}
