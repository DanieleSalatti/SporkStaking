import { NextjsSite, Queue, RDS, StackContext } from "sst/constructs";

export function StakingStack({ stack }: StackContext) {
  const DATABASE = "CounterDB";

  const cluster = new RDS(stack, "Cluster", {
    engine: "mysql5.7",
    defaultDatabaseName: DATABASE,
    migrations: "services/migrations",
  });

  const inboundQueue = new Queue(stack, "Queue", {
    consumer: "packages/functions/src/inboundConsumer.handler",
  });

  const site = new NextjsSite(stack, "Site", {
    path: "packages/frontend",
    // customDomain: "custom-domain.com",
    edge: true,
    environment: {
      DB_HOST: cluster.clusterIdentifier,
      INBOUND_QUEUE: inboundQueue.queueUrl,
    },
  });

  site.attachPermissions([cluster]);

  stack.addOutputs({
    URL: site.url,
    DATABASE:
      cluster.clusterEndpoint.hostname + ":" + cluster.clusterEndpoint.port,
    DATABASE_SOCKET: cluster.clusterEndpoint.socketAddress,
    INBOUND_QUEUE: inboundQueue.queueUrl,
  });
}
