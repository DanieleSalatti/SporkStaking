import { RDSDataService } from "aws-sdk";
import { Kysely, sql } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "sst/node/rds";

interface Database {
  member: {
    id?: number;
    first_name: string;
    last_name: string;
    wallet: string;
    country: string;
    email: string;
    amount: string;
    created_at?: Date;
    is_active: boolean;
  };
  staked_at: {
    wallet: string;
    total_amount: string;
    created_at?: Date;
  };
  running_totals: {
    wallet: string;
    total_amount: string;
    updated_at?: Date;
  };
}

const db = new Kysely<Database>({
  dialect: new DataApiDialect({
    mode: "mysql",
    driver: {
      database: RDS.Cluster.defaultDatabaseName,
      secretArn: RDS.Cluster.secretArn,
      resourceArn: RDS.Cluster.clusterArn,
      client: new RDSDataService(),
    },
  }),
});

export async function handler() {
  console.log("Messages received!");

  // Select only the latest row for each wallet that is at least 24 hours old
  const stake_records = await db
    .selectFrom("staked_at")
    .distinctOn("wallet")
    .selectAll()
    .where("created_at", "<", sql`now() - interval '1 day'`)
    .orderBy("wallet")
    .orderBy("created_at", "desc")
    .execute();

  // Create / update the running totals in the running_totals table
  for (const record of stake_records) {
    const running_total = await db
      .selectFrom("running_totals")
      .select("total_amount")
      .where("wallet", "=", record.wallet)
      .executeTakeFirst();

    if (!running_total) {
      await db
        .insertInto("running_totals")
        .values({
          wallet: record.wallet,
          total_amount: record.total_amount,
        })
        .execute();
    } else {
      await db
        .updateTable("running_totals")
        .set({
          total_amount: sql`${record.total_amount} + ${running_total.total_amount}`,
          updated_at: sql`now()`,
        })
        .where("wallet", "=", record.wallet)
        .execute();
    }
  }

  return {};
}
