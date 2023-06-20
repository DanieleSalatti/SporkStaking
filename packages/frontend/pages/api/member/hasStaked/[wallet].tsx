import { RDSData } from "@aws-sdk/client-rds-data";
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return await getMember(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed", success: false });
  }
}

async function getMember(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const { wallet } = query;

  if (!wallet) {
    return res.status(400).json({ message: "Missing wallet", success: false });
  }

  const baseQuery = db.selectFrom("stake_log").selectAll().where("wallet", "=", wallet);

  const stake_log = await baseQuery.execute();

  res.status(200).json({ success: true, exists: stake_log.length > 0 });
}
