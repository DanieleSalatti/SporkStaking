import { Cron, NextjsSite, Queue, RDS, StackContext } from "sst/constructs";

export function StakingStack({ stack }: StackContext) {
  const DATABASE = "CounterDB";

  /*
   * RDS Cluster
   */
  const cluster = new RDS(stack, "Cluster", {
    engine: "mysql5.7",
    defaultDatabaseName: DATABASE,
    migrations: "services/migrations",
  });

  /*
   * SQS Queue
   * This is where we'll receive messages from the frontend.
   * Currently messages are received when:
   * - member stakes amount
   * - member unstakes amount
   */
  const inboundQueue = new Queue(stack, "Queue", {
    /*
     * This is the function that will process inbound messages,
     * keeping track of the member's balance and active state
     * in the database.
     */
    consumer: {
      function: {
        handler: "packages/functions/src/inboundConsumer.handler",
        permissions: [cluster],
        environment: {
          POLYGON_RPC_URL: "https://rpc-mainnet.maticvigil.com",
          STAKING_CONTRACT_ADDRESS:
            "0xAC6efAd5443280b1E5D93F5bfe076a7Ce6e448De",
        },
      },
      cdk: {
        eventSource: {
          batchSize: 5,
        },
      },
    },
  });

  /*
   * Next.js Site
   */
  const site = new NextjsSite(stack, "Site", {
    path: "packages/frontend",
    // customDomain: stack.stage === "prod" ? "custom-domain.com" : undefined,
    edge: true,
    environment: {
      DB_HOST: cluster.clusterIdentifier,
      INBOUND_QUEUE: inboundQueue.queueUrl,
    },
  });

  /*
   * Cron Job
   * This is where we'll run the bookkeeping function
   * that will calculate the member's balance and update
   * the database.
   */
  new Cron(stack, "Cron", {
    schedule: "rate(1 day)",
    job: "packages/functions/src/bookkeeping.main",
  });

  /*
   * Permissions
   */
  site.attachPermissions([cluster]);

  stack.addOutputs({
    URL: site.url,
    DATABASE:
      cluster.clusterEndpoint.hostname + ":" + cluster.clusterEndpoint.port,
    DATABASE_SOCKET: cluster.clusterEndpoint.socketAddress,
    INBOUND_QUEUE: inboundQueue.queueUrl,
  });
}
