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
    return await getContractLog(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed", success: false });
  }
}

async function getContractLog(req: NextApiRequest, res: NextApiResponse) {
  let baseQuery = db.selectFrom("contract_running_total").selectAll().orderBy("created_at", "asc");

  const contract_running_total = await baseQuery.execute();
  console.log("DASA contract", contract_running_total);
  res.status(200).json({ success: true, stakeLog: contract_running_total, total: contract_running_total.length });
}
