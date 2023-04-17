import { NextjsSite, Queue, RDS, StackContext } from "sst/constructs";

export function StakingStack({ stack }: StackContext) {
  const DATABASE = "CounterDB";

  const cluster = new RDS(stack, "Cluster", {
    engine: "mysql5.7",
    defaultDatabaseName: DATABASE,
    // Migration scripts are run manually with prisma migrate
    migrations: "services/migrations",
  });
  /*
  const memberTable = new Table(stack, "Member", {
    fields: {
      first_name: "string",
      last_name: "string",
      wallet: "string",
      country: "string",
      email: "string",
      date: "string",
      is_active: "binary",
    },
    primaryIndex: { partitionKey: "wallet", sortKey: "date" },
  });
*/
  const inboundQueue = new Queue(stack, "Queue", {
    consumer: "packages/functions/src/inboundConsumer.handler",
  });

  const site = new NextjsSite(stack, "Site", {
    path: "packages/frontend",
    // customDomain: "custom-domain.com",
    edge: true,
    environment: {
      // Pass the table details to our app
      // MEMBER_TABLE_NAME: memberTable.tableName,
      DB_HOST: cluster.clusterIdentifier,
      INBOUND_QUEUE: inboundQueue.queueUrl,
      //INBOUND_MEMBER_TABLE_NAME: InboundMemberTable.tableName,
    },
  });

  // site.attachPermissions([memberTable]);
  site.attachPermissions([cluster]);

  stack.addOutputs({
    URL: site.url,
    DATABASE:
      cluster.clusterEndpoint.hostname + ":" + cluster.clusterEndpoint.port,
    DATABASE_SOCKET: cluster.clusterEndpoint.socketAddress,
    INBOUND_QUEUE: inboundQueue.queueUrl,
  });
}
