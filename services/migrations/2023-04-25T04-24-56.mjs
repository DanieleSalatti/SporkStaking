import { sql } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("stake_log")
    .addColumn("wallet", "varchar(50)", (col) => col.notNull())
    .addColumn("total_amount", "varchar(255)", (col) =>
      col.notNull().defaultTo(0)
    )
    .addColumn("created_at", "datetime", (col) => col.defaultTo(sql`now()`))
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

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("stake_log").execute();
}
