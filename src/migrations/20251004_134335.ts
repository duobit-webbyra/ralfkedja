import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`reviews\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`feedback\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`reviews_updated_at_idx\` ON \`reviews\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`reviews_created_at_idx\` ON \`reviews\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`announcement\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`activate\` integer,
  	\`message\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`contact\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`address_street\` text NOT NULL,
  	\`address_city\` text NOT NULL,
  	\`address_zipcode\` numeric NOT NULL,
  	\`phone\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`links_facebook\` text,
  	\`links_instagram\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`gallery_images_order_idx\` ON \`gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`gallery_images_parent_id_idx\` ON \`gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`gallery_images_image_idx\` ON \`gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`gallery\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`highlight_reviews\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`reviews_review_one_id\` integer,
  	\`reviews_review_two_id\` integer,
  	\`reviews_review_three_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`reviews_review_one_id\`) REFERENCES \`reviews\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reviews_review_two_id\`) REFERENCES \`reviews\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reviews_review_three_id\`) REFERENCES \`reviews\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`highlight_reviews_reviews_reviews_review_one_idx\` ON \`highlight_reviews\` (\`reviews_review_one_id\`);`)
  await db.run(sql`CREATE INDEX \`highlight_reviews_reviews_reviews_review_two_idx\` ON \`highlight_reviews\` (\`reviews_review_two_id\`);`)
  await db.run(sql`CREATE INDEX \`highlight_reviews_reviews_reviews_review_three_idx\` ON \`highlight_reviews\` (\`reviews_review_three_id\`);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`role\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`focal_x\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`focal_y\` numeric;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`reviews_id\` integer REFERENCES reviews(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_reviews_id_idx\` ON \`payload_locked_documents_rels\` (\`reviews_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`reviews\`;`)
  await db.run(sql`DROP TABLE \`announcement\`;`)
  await db.run(sql`DROP TABLE \`contact\`;`)
  await db.run(sql`DROP TABLE \`gallery_images\`;`)
  await db.run(sql`DROP TABLE \`gallery\`;`)
  await db.run(sql`DROP TABLE \`highlight_reviews\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`role\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`focal_x\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`focal_y\`;`)
}
