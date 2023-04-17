import { SSTConfig } from "sst";
import { StakingStack } from "./stacks/StakingStack";

export default {
  config(_input) {
    return {
      name: "SporkStakingSST",
      region: "us-west-2", // Oregon
    };
  },
  stacks(app) {
    app.stack(StakingStack);
    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }
  },
} satisfies SSTConfig;
