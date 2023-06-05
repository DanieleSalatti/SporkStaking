import { Cron, NextjsSite, Queue, RDS, StackContext } from "sst/constructs";

export function StakingStack({ stack }: StackContext) {
  const DATABASE = "SporkStaking";

  /*
   * RDS Cluster
   */
  const cluster = new RDS(stack, "Cluster", {
    engine: "mysql5.7",
    defaultDatabaseName: DATABASE,
    migrations: "services/migrations",
    scaling: {
      autoPause: stack.stage !== "prod",
      minCapacity: stack.stage === "prod" ? "ACU_2" : "ACU_1",
      maxCapacity: stack.stage === "prod" ? "ACU_16" : "ACU_1",
    },
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
        bind: [cluster],
        environment: {
          POLYGON_ALCHEMY_KEY: "lQLpodoMvP1mGHFY01myNQ6JiXklUNIx",
          SSPORK_ADDRESS: "0x3e356BC667DA320824b9AF5eC5B5ce3edaEbF754",
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
    bind: [inboundQueue, cluster],
    edge: false,
    environment: {
      DB_HOST: cluster.clusterIdentifier,
      INBOUND_QUEUE: inboundQueue.queueUrl,
    },
  });

  const dashboard = new NextjsSite(stack, "Dashboard", {
    path: "packages/dashboard",
    // customDomain: stack.stage === "prod" ? "custom-domain.com" : undefined,
    bind: [cluster],
    edge: false,
    environment: {
      DB_HOST: cluster.clusterIdentifier,
    },
  });

  /*
   * Cron Job
   * This is where we'll run the bookkeeping function
   * that will calculate the member's balance and update
   * the database.
   */
  new Cron(stack, "Cron", {
    schedule: stack.stage === "prod" ? "rate(1 day)" : "rate(5 minutes)",
    job: {
      function: {
        handler: "packages/functions/src/bookkeeping.handler",
        permissions: [cluster],
        bind: [cluster],
      },
    },
  });

  stack.addOutputs({
    SITE_URL: site.url,
    DASH_URL: dashboard.url,
    DATABASE:
      cluster.clusterEndpoint.hostname + ":" + cluster.clusterEndpoint.port,
    DATABASE_SOCKET: cluster.clusterEndpoint.socketAddress,
    INBOUND_QUEUE: inboundQueue.queueUrl,
  });
}
