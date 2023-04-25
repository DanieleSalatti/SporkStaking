import { SQSEvent } from "aws-lambda";
import { RDSDataService } from "aws-sdk";
import { BigNumber, ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "sst/node/rds";

const erc20abi = ["function balanceOf(address owner) view returns (uint256)"];

const stakedSporkAddress = "0x3e356BC667DA320824b9AF5eC5B5ce3edaEbF754";

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

export async function main(event: SQSEvent) {
  console.log("Messages received!");

  const records: any[] = event.Records;

  for (const record of records) {
    const message = JSON.parse(record.body);
    console.log("Processing message", message);

    const provider = new ethers.providers.JsonRpcProvider(
      process.env.POLYGON_RPC_URL
    );

    const stakedSporkContract = new ethers.Contract(
      stakedSporkAddress,
      erc20abi,
      provider
    );

    const newamount: BigNumber = await stakedSporkContract.balanceOf(
      record.wallet
    );

    const member = await db
      .selectFrom("member")
      .selectAll()
      .where("wallet", "=", record.wallet)
      .executeTakeFirst();

    await db.insertInto("staked_at").values({
      wallet: record.wallet,
      total_amount: formatEther(newamount),
    });

    if (!member) {
      await db
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
        .execute();
      return {};
    }

    if (newamount.eq(0)) {
      await db
        .updateTable("member")
        .set({ is_active: false, amount: formatEther(newamount) })
        .where("wallet", "=", record.wallet)
        .execute();
      return {};
    }

    await db
      .updateTable("member")
      .set({ is_active: true, amount: formatEther(newamount) })
      .where("wallet", "=", record.wallet)
      .execute();
    return {};
  }

  return {};
}
