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

  // Correct relationship table using Payload's naming convention
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`subscribers_rels\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`order\` integer,
    \`parent_id\` integer NOT NULL,
    \`path\` text NOT NULL,
    \`subscriber_categories_id\` integer,
    FOREIGN KEY (\`subscriber_categories_id\`) REFERENCES \`subscriber_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`subscribers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  )`)

  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`subscribers_email_idx\` ON \`subscribers\` (\`email\`)`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`subscribers_rels_order_idx\` ON \`subscribers_rels\` (\`order\`)`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`subscribers_rels_parent_idx\` ON \`subscribers_rels\` (\`parent_id\`)`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`subscribers_rels_path_idx\` ON \`subscribers_rels\` (\`path\`)`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS \`subscribers_rels\``)
  await db.run(sql`DROP TABLE IF EXISTS \`subscribers\``)
  await db.run(sql`DROP TABLE IF EXISTS \`subscriber_categories\``)
}
