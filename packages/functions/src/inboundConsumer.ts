import { RDSData } from "@aws-sdk/client-rds-data";
import { SQSEvent } from "aws-lambda";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import fetch from "node-fetch";
import { RDS } from "sst/node/rds";

// const erc20abi = ["function balanceOf(address owner) view returns (uint256)"];

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

export async function handler(event: SQSEvent) {
  console.log("Messages received!");

  const records: any[] = event.Records;

  for (const record of records) {
    const message = JSON.parse(record.body);
    console.log("💌 Processing message", message);

    console.log("🔑 Creating provider", process.env.POLYGON_ALCHEMY_KEY);

    const fetchURL = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.POLYGON_ALCHEMY_KEY}`;

    var raw = JSON.stringify({
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      headers: {
        "Content-Type": "application/json",
      },
      params: [`${message.wallet}`, [`${process.env.SSPORK_ADDRESS!}`]],
      id: 42,
    });

    var requestOptions = {
      method: "POST",
      body: raw,
      redirect: "follow",
    };

    // Make the request and print the formatted response:
    const response = await (await fetch(fetchURL, requestOptions)).json();

    console.log("💶 Getting balance for member", message.wallet);

    const newamount = ethers.BigNumber.from(
      response.result.tokenBalances[0].tokenBalance
    );

    console.log("💶 New amount", formatEther(newamount));

    console.log("👨🏻 Fetching member");

    const member = await db
      .selectFrom("member")
      .selectAll()
      .where("wallet", "=", message.wallet)
      .executeTakeFirst();

    console.log("📝 Inserting into stake_log");

    const newStakeLog = await db
      .insertInto("stake_log")
      .values({
        wallet: message.wallet,
        total_amount: formatEther(newamount),
      })
      .execute();

    console.log("📝 Inserted into stake_log", newStakeLog.length);

    if (!member) {
      console.log("📝 Member does not exist, creating new one");
      const newMember = await db
        .insertInto("member")
        .values({
          first_name: message.first_name,
          last_name: message.last_name,
          wallet: message.wallet,
          country: message.country,
          email: message.email,
          amount: formatEther(newamount),
          is_active: true,
        })
        .executeTakeFirstOrThrow();
      console.log("✅ Done!", newMember.insertId);
      return {};
    }

    if (newamount.eq(0)) {
      console.log(
        "📝 Member has unstaked completely, setting is_active to false"
      );
      const updatedInactiveMember = await db
        .updateTable("member")
        .set({ is_active: false, amount: formatEther(newamount) })
        .where("wallet", "=", message.wallet)
        .executeTakeFirstOrThrow();
      console.log("✅ Done!", updatedInactiveMember.numUpdatedRows);
      return {};
    }

    console.log("📝 Updating member");

    const updatedMember = await db
      .updateTable("member")
      .set({ is_active: true, amount: formatEther(newamount) })
      .where("wallet", "=", message.wallet)
      .executeTakeFirstOrThrow();
    console.log("✅ Done!", updatedMember.numUpdatedRows);
    return {};
  }
  console.log("✅ Done processing messages!");
  return {};
}
