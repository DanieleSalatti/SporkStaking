import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("running_totals")
    .addColumn("wallet", "varchar(50)", (col) => col.notNull())
    .addColumn("amount", "varchar(255)", (col) => col.notNull().defaultTo(0))
    .addColumn("updated_at", "datetime", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createIndex("wallet_address")
    .on("running_totals")
    .column("wallet")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("running_totals").execute();
}

module.exports = { up, down };
