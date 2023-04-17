import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("member")
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("first_name", "varchar(255)", (col) => col.notNull())
    .addColumn("last_name", "varchar(255)", (col) => col.notNull())
    .addColumn("wallet", "varchar(50)", (col) => col.notNull())
    .addColumn("country", "varchar(255)", (col) => col.notNull())
    .addColumn("email", "varchar(255)", (col) => col.notNull())
    .addColumn("created_at", "datetime", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("is_active", "boolean", (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex("member_active")
    .on("member")
    .column("is_active")
    .execute();

  await db.schema
    .createIndex("member_wallet")
    .on("member")
    .column("wallet")
    .execute();

  await db.schema
    .createIndex("member_created_at")
    .on("member")
    .column("created_at")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("member").execute();
}

module.exports = { up, down };
