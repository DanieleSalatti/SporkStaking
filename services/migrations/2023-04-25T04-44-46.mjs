import { sql } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("running_totals")
    .addColumn("wallet", "varchar(50)", (col) => col.notNull())
    .addColumn("amount", "varchar(255)", (col) => col.notNull().defaultTo(0))
    .addColumn("updated_at", "datetime", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("percentage_share", "bigint", (col) =>
      col.notNull().defaultTo(0)
    )
    .execute();

  await db.schema
    .createIndex("wallet_address")
    .on("running_totals")
    .column("wallet")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("running_totals").execute();
}
