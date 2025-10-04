import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`news_likes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`user_id\` integer NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`news\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`news_likes_order_idx\` ON \`news_likes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`news_likes_parent_id_idx\` ON \`news_likes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`news_likes_user_idx\` ON \`news_likes\` (\`user_id\`);`)
  await db.run(sql`CREATE TABLE \`news_comments_likes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`user_id\` integer NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`news_comments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`news_comments_likes_order_idx\` ON \`news_comments_likes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`news_comments_likes_parent_id_idx\` ON \`news_comments_likes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`news_comments_likes_user_idx\` ON \`news_comments_likes\` (\`user_id\`);`)
  await db.run(sql`CREATE TABLE \`news_comments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`comment\` text NOT NULL,
  	\`author_id\` integer NOT NULL,
  	\`created_at\` text,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`news\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`news_comments_order_idx\` ON \`news_comments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`news_comments_parent_id_idx\` ON \`news_comments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`news_comments_author_idx\` ON \`news_comments\` (\`author_id\`);`)
  await db.run(sql`CREATE TABLE \`news\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`content\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`news_updated_at_idx\` ON \`news\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`news_created_at_idx\` ON \`news\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`videos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`url\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`videos_updated_at_idx\` ON \`videos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`videos_created_at_idx\` ON \`videos\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`name\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`news_id\` integer REFERENCES news(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`videos_id\` integer REFERENCES videos(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_news_id_idx\` ON \`payload_locked_documents_rels\` (\`news_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_videos_id_idx\` ON \`payload_locked_documents_rels\` (\`videos_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`news_likes\`;`)
  await db.run(sql`DROP TABLE \`news_comments_likes\`;`)
  await db.run(sql`DROP TABLE \`news_comments\`;`)
  await db.run(sql`DROP TABLE \`news\`;`)
  await db.run(sql`DROP TABLE \`videos\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`reviews_id\` integer,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`reviews_id\`) REFERENCES \`reviews\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "reviews_id", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "reviews_id", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_reviews_id_idx\` ON \`payload_locked_documents_rels\` (\`reviews_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`name\`;`)
}
