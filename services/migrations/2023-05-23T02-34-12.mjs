import { sql } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("running_totals_snapshot")
    .addColumn("wallet", "varchar(50)", (col) => col.notNull())
    .addColumn("amount", "varchar(255)", (col) => col.notNull().defaultTo(0))
    .addColumn("percentage_share", "decimal(10, 7)", (col) =>
      col.notNull().defaultTo(0)
    )
    .addColumn("fiscal_year", "numeric(4, 0)", (col) => col.notNull())
    .addColumn("updated_at", "datetime", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createIndex("wallet_address_snapshot")
    .on("running_totals")
    .column("wallet")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("running_totals_snapshot").execute();
}
