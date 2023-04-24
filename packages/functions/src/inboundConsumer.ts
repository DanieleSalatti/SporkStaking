import { SQSEvent } from "aws-lambda";
import { RDSDataService } from "aws-sdk";
import { BigNumber, ethers } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "sst/node/rds";
import SporkStakerABI from "./abis/SporkStaker.json" assert { type: "json" };
interface Database {
  member: {
    id: number;
    first_name: string;
    last_name: string;
    wallet: string;
    country: string;
    email: string;
    amount: string;
    created_at: Date;
    is_active: boolean;
  };
}

const db = new Kysely<Database>({
  dialect: new DataApiDialect({
    mode: "postgres",
    driver: {
      database: RDS.Cluster.defaultDatabaseName,
      secretArn: RDS.Cluster.secretArn,
      resourceArn: RDS.Cluster.clusterArn,
      client: new RDSDataService(),
    },
  }),
});

export async function main(event: SQSEvent) {
  console.log("Messages received!");

  const records: any[] = event.Records;

  for (const record of records) {
    const message = JSON.parse(record.body);
    console.log("Processing message", message);

    // TODO: validate data with blockchain here
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.POLYGON_RPC_URL
    );
    const contract = new ethers.Contract(
      process.env.STAKING_CONTRACT_ADDRESS!,
      SporkStakerABI,
      provider
    );

    const events = await contract.queryFilter(
      "*",
      record.blockNumber - 1,
      record.blockNumber + 1
    );

    const event = events.find(
      (event) =>
        event.args?.sender.toString().toLowerCase() ===
          record.wallet.toString().toLowerCase() &&
        event.args?.amount.toString().toLowerCase() ===
          record.amount.toString().toLowerCase()
    );

    if (!event) {
      console.log("Error while processing message", message);
      throw new Error("Invalid message: " + message.id);
    }

    const member = await db
      .selectFrom("member")
      .selectAll()
      .where("wallet", "=", record.wallet)
      .executeTakeFirstOrThrow();

    const currentamount: BigNumber = parseEther(member.amount);

    let newamount: BigNumber = BigNumber.from(0);

    if (message.amount > 0) {
      newamount = currentamount.add(parseEther(message.amount));
    } else {
      newamount = currentamount.sub(parseEther(message.amount));
    }

    if (newamount.lt(0)) {
      throw new Error("Member balance is negative");
    }

    if (newamount.eq(0)) {
      await db
        .updateTable("member")
        .set({ is_active: false, amount: formatEther(newamount.toString()) })
        .where("wallet", "=", record.wallet)
        .execute();
      return {};
    }

    await db
      .updateTable("member")
      .set({ is_active: true, amount: formatEther(newamount.toString()) })
      .where("wallet", "=", record.wallet)
      .execute();
    return {};
  }

  return {};
}
