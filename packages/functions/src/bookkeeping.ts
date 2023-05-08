import { RDSData } from "@aws-sdk/client-rds-data";
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
  stake_log: {
    wallet: string;
    total_amount: string;
    created_at?: Date;
  };
  running_totals: {
    wallet: string;
    amount: string;
    percentage_share: number;
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
      client: new RDSData({}),
    },
  }),
});

export async function handler() {
  console.log("🔧 starting bookkeeping function...");

  const all_stakes = await db.selectFrom("stake_log").selectAll().execute();

  console.log("🔧 all_stakes", all_stakes.length, all_stakes);

  const { max } = db.fn;
  // Select only the latest row for each wallet that is at least 24 hours old
  const stake_records = await db
    .selectFrom("stake_log")
    .selectAll()
    .innerJoin(
      db
        .selectFrom("stake_log")
        .select(["wallet", max("created_at").as("max_created_at")])
        .groupBy("wallet")
        .as("latest_stake_log"),
      (join) =>
        join
          .onRef("stake_log.wallet", "=", "latest_stake_log.wallet")
          .onRef("stake_log.created_at", "=", "latest_stake_log.max_created_at")
    )
    .where(
      "created_at",
      "<",
      process.env.NODE_ENV === "production"
        ? sql`now() - interval 1 day`
        : sql`now() - interval 1 hour` // for testing purposes, calculate every 1 hour
    )
    .orderBy("created_at", "desc")
    .execute();

  console.log("🔧 stake_records", stake_records.length, stake_records);

  // quicly calculate the total amount for all wallets
  const total_amount = stake_records.reduce(
    (acc, record) => acc + Number(record.total_amount),
    0
  );

  // Create / update the running totals in the running_totals table
  for (const record of stake_records) {
    console.log("🔧 record", record);

    const percentageShare = Number(record.total_amount) / total_amount;

    const running_total = await db
      .selectFrom("running_totals")
      .select("amount")
      .where("wallet", "=", record.wallet)
      .executeTakeFirst();

    console.log("🔧 running_total", running_total);
    if (!running_total) {
      console.log("Inserting new running_total");
      await db
        .insertInto("running_totals")
        .values({
          wallet: record.wallet,
          amount: record.total_amount,
          percentage_share: percentageShare,
        })
        .execute();
    } else {
      console.log("Updating existing running_total");
      await db
        .updateTable("running_totals")
        .set({
          amount: sql`${record.total_amount} + ${running_total.amount}`,
          updated_at: sql`now()`,
          percentage_share: percentageShare,
        })
        .where("wallet", "=", record.wallet)
        .execute();
    }
    console.log("✅ updated running_total", record.wallet);
  }

  console.log("✅ finished bookkeeping function");

  return {};
}
