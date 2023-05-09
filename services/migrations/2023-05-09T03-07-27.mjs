import { sql } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("contract_running_total")
    .addColumn("amount", "varchar(255)", (col) => col.notNull().defaultTo(0))
    .addColumn("created_at", "datetime", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createIndex("created_at")
    .on("contract_running_total")
    .column("created_at")
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("contract_running_total").execute();
}
