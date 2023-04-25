import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("stake_log")
    .addColumn("wallet", "varchar(50)", (col) => col.notNull())
    .addColumn("total_amount", "varchar(255)", (col) =>
      col.notNull().defaultTo(0)
    )
    .addColumn("created_at", "datetime", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createIndex("created_at")
    .on("stake_log")
    .column("created_at")
    .execute();

  await db.schema
    .createIndex("wallet_staked_at")
    .on("stake_log")
    .columns(["created_at", "wallet"])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("stake_log").execute();
}

module.exports = { up, down };
