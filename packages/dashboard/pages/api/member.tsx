import { RDSData } from "@aws-sdk/client-rds-data";
import AWS from "aws-sdk";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { NextApiRequest, NextApiResponse } from "next";
import { RDS } from "sst/node/rds";
import Database from "~~/common/interfaces";

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

const sqs = new AWS.SQS();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return await createMember(req, res);
  } else if (req.method === "GET") {
    return await getMembers(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed", success: false });
  }
}

async function createMember(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;

  try {
    await sqs
      .sendMessage({
        // Get the queue url from the environment variable
        QueueUrl: process.env.INBOUND_QUEUE!,
        MessageBody: JSON.stringify({
          first_name: body.first_name,
          last_name: body.last_name,
          country: body.country,
          wallet: body.wallet,
          email: body.email,
          amount: body.amount,
          block_number: body.block_number,
        }),
      })
      .promise();

    console.log("Message queued!");

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating member", success: false });
  }
}

async function getMembers(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const { page, limit, wallet, orderByField, orderByDirection } = query;

  let baseQuery = db
    .selectFrom("member")
    .innerJoin("running_totals", "member.wallet", "running_totals.wallet")
    .select([
      "member.first_name",
      "member.last_name",
      "member.country",
      "member.email",
      "member.wallet",
      "running_totals.amount",
      "running_totals.percentage_share",
    ])
    .where("member.is_active", "=", true)

  if (wallet && wallet !== "") {
    baseQuery = baseQuery.where("member.wallet", "like", "%" + wallet + "%");
  }

  const orderByOptions = ["first_name", "last_name", "country", "email", "wallet", "amount"];
  if (orderByOptions.includes(orderByField as string)) {
    baseQuery = baseQuery.orderBy(orderByField as string, (orderByDirection as string) || "asc");
  } else {
    baseQuery = baseQuery.orderBy("first_name", "asc");
  }

  const totalMembers = await baseQuery
    .select(eb => eb.fn.count<number>("id").as("member_count"))
    .executeTakeFirstOrThrow();

  const members = await baseQuery
    .limit(Number(limit || 10))
    .offset(Number(page || 0) * Number(limit || 10))
    .execute();

  res.status(200).json({ success: true, members, total: totalMembers.member_count });
}
