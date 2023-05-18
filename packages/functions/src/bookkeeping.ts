import { RDSData } from "@aws-sdk/client-rds-data";
import { Kysely, sql } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "sst/node/rds";
import { Database } from "./common";

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
        : sql`now() - interval 3 minute` // for testing purposes, calculate every 1 hour
    )
    .orderBy("created_at", "desc")
    .execute();

  console.log("🔧 stake_records", stake_records.length);

  // quickly calculate the total amount for all wallets
  const total_amount = stake_records.reduce(
    (acc, record) => acc + Number(record.total_amount),
    0
  );

  console.log("🔧 total_amount", total_amount);
  // Insert the total amount into the contract_running_total table
  await db
    .insertInto("contract_running_total")
    .values({
      amount: total_amount,
    })
    .execute();

  // Create / update the running totals in the running_totals table
  for (const record of stake_records) {
    console.log("🔧 record", record);

    const running_total = await db
      .selectFrom("running_totals")
      .innerJoin("member", "member.wallet", "running_totals.wallet")
      .select(["running_totals.amount", "member.is_active"])
      .where("wallet", "=", record.wallet)
      .executeTakeFirst();

    if (running_total && !running_total.is_active) {
      // inactive members should not be included in the running total calculation
      // but also should not lose their running total
      console.log("Skipping inactive wallet", record.wallet);
      continue;
    }

    console.log("🔧 running_total", running_total);
    if (!running_total) {
      console.log("Inserting new running_total");
      await db
        .insertInto("running_totals")
        .values({
          wallet: record.wallet,
          amount: record.total_amount,
        })
        .execute();
    } else {
      console.log("Updating existing running_total");
      await db
        .updateTable("running_totals")
        .set({
          amount: sql`${record.total_amount} + ${running_total.amount}`,
          updated_at: sql`now()`,
        })
        .where("wallet", "=", record.wallet)
        .execute();
    }
    console.log("✅ updated running_total", record.wallet);
  }

  // Calculate the percentage share for each wallet
  const allRunningTotals = await db
    .selectFrom("running_totals")
    .selectAll()
    .execute();

  // First calculate the total shares
  let totalShares = 0;
  for (const runningTotal of allRunningTotals) {
    totalShares += Number(runningTotal.amount);
  }

  console.log("🔧 totalShares", totalShares);

  // Then calculate the percentage share for each wallet
  for (const runningTotal of allRunningTotals) {
    const percentageShare = (Number(runningTotal.amount) / totalShares) * 100;
    console.log("🔧 percentageShare", percentageShare);
    // Update the running_total with the percentage share
    await db
      .updateTable("running_totals")
      .set({
        percentage_share: percentageShare,
      })
      .where("wallet", "=", runningTotal.wallet)
      .execute();
  }

  console.log("✅ finished bookkeeping function");

  return {};
}
