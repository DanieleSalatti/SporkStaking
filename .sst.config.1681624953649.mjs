import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// stacks/ExampleStack.ts
import { NextjsSite, Table } from "sst/constructs";
function ExampleStack({ stack }) {
  const memberTable = new Table(stack, "Member", {
    fields: {
      first_name: "string",
      last_name: "string",
      wallet: "string",
      country: "string",
      email: "string",
      date: "string",
      is_active: "binary"
    },
    primaryIndex: { partitionKey: "wallet" }
  });
  const site = new NextjsSite(stack, "Site", {
    path: "packages/frontend",
    environment: {
      MEMBER_TABLE_NAME: memberTable.tableName
    }
  });
  stack.addOutputs({
    URL: site.url
  });
}
__name(ExampleStack, "ExampleStack");

// sst.config.ts
var sst_config_default = {
  config(_input) {
    return {
      name: "SporkStakingSST",
      region: "eu-south-1"
    };
  },
  stacks(app) {
    app.stack(ExampleStack);
  }
};
export {
  sst_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RhY2tzL0V4YW1wbGVTdGFjay50cyIsICJzc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBOZXh0anNTaXRlLCBTdGFja0NvbnRleHQsIFRhYmxlIH0gZnJvbSBcInNzdC9jb25zdHJ1Y3RzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBFeGFtcGxlU3RhY2soeyBzdGFjayB9OiBTdGFja0NvbnRleHQpIHtcbiAgY29uc3QgbWVtYmVyVGFibGUgPSBuZXcgVGFibGUoc3RhY2ssIFwiTWVtYmVyXCIsIHtcbiAgICBmaWVsZHM6IHtcbiAgICAgIGZpcnN0X25hbWU6IFwic3RyaW5nXCIsXG4gICAgICBsYXN0X25hbWU6IFwic3RyaW5nXCIsXG4gICAgICB3YWxsZXQ6IFwic3RyaW5nXCIsXG4gICAgICBjb3VudHJ5OiBcInN0cmluZ1wiLFxuICAgICAgZW1haWw6IFwic3RyaW5nXCIsXG4gICAgICBkYXRlOiBcInN0cmluZ1wiLFxuICAgICAgaXNfYWN0aXZlOiBcImJpbmFyeVwiLFxuICAgIH0sXG4gICAgcHJpbWFyeUluZGV4OiB7IHBhcnRpdGlvbktleTogXCJ3YWxsZXRcIiB9LFxuICB9KTtcblxuICAvKmNvbnN0IEluYm91bmRNZW1iZXJUYWJsZSA9IG5ldyBUYWJsZShzdGFjaywgXCJJbmJvdW5kTWVtYmVyXCIsIHtcbiAgICBmaWVsZHM6IHtcbiAgICAgIGZpcnN0X25hbWU6IFwic3RyaW5nXCIsXG4gICAgICBsYXN0X25hbWU6IFwic3RyaW5nXCIsXG4gICAgICB3YWxsZXQ6IFwic3RyaW5nXCIsXG4gICAgICBjb3VudHJ5OiBcInN0cmluZ1wiLFxuICAgICAgZW1haWw6IFwic3RyaW5nXCIsXG4gICAgICBkYXRlOiBcInN0cmluZ1wiLFxuICAgICAgYW1vdW50OiBcIm51bWJlclwiLFxuICAgICAgYmxvY2tfbnVtYmVyOiBcIm51bWJlclwiLFxuICAgIH0sXG4gICAgcHJpbWFyeUluZGV4OiB7IHBhcnRpdGlvbktleTogXCJ3YWxsZXRcIiB9LFxuICB9KTsqL1xuXG4gIGNvbnN0IHNpdGUgPSBuZXcgTmV4dGpzU2l0ZShzdGFjaywgXCJTaXRlXCIsIHtcbiAgICBwYXRoOiBcInBhY2thZ2VzL2Zyb250ZW5kXCIsXG4gICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgIC8vIFBhc3MgdGhlIHRhYmxlIGRldGFpbHMgdG8gb3VyIGFwcFxuICAgICAgTUVNQkVSX1RBQkxFX05BTUU6IG1lbWJlclRhYmxlLnRhYmxlTmFtZSxcbiAgICAgIC8vSU5CT1VORF9NRU1CRVJfVEFCTEVfTkFNRTogSW5ib3VuZE1lbWJlclRhYmxlLnRhYmxlTmFtZSxcbiAgICB9LFxuICB9KTtcblxuICBzdGFjay5hZGRPdXRwdXRzKHtcbiAgICBVUkw6IHNpdGUudXJsLFxuICB9KTtcbn1cbiIsICJpbXBvcnQgeyBTU1RDb25maWcgfSBmcm9tIFwic3N0XCI7XG5pbXBvcnQgeyBFeGFtcGxlU3RhY2sgfSBmcm9tIFwiLi9zdGFja3MvRXhhbXBsZVN0YWNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnKF9pbnB1dCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBcIlNwb3JrU3Rha2luZ1NTVFwiLFxuICAgICAgcmVnaW9uOiBcImV1LXNvdXRoLTFcIixcbiAgICB9O1xuICB9LFxuICBzdGFja3MoYXBwKSB7XG4gICAgYXBwLnN0YWNrKEV4YW1wbGVTdGFjayk7XG4gIH0sXG59IHNhdGlzZmllcyBTU1RDb25maWc7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7OztBQUFBLFNBQVMsWUFBMEIsYUFBYTtBQUV6QyxTQUFTLGFBQWEsRUFBRSxNQUFNLEdBQWlCO0FBQ3BELFFBQU0sY0FBYyxJQUFJLE1BQU0sT0FBTyxVQUFVO0FBQUEsSUFDN0MsUUFBUTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sV0FBVztBQUFBLElBQ2I7QUFBQSxJQUNBLGNBQWMsRUFBRSxjQUFjLFNBQVM7QUFBQSxFQUN6QyxDQUFDO0FBZ0JELFFBQU0sT0FBTyxJQUFJLFdBQVcsT0FBTyxRQUFRO0FBQUEsSUFDekMsTUFBTTtBQUFBLElBQ04sYUFBYTtBQUFBLE1BRVgsbUJBQW1CLFlBQVk7QUFBQSxJQUVqQztBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sV0FBVztBQUFBLElBQ2YsS0FBSyxLQUFLO0FBQUEsRUFDWixDQUFDO0FBQ0g7QUF4Q2dCOzs7QUNDaEIsSUFBTyxxQkFBUTtBQUFBLEVBQ2IsT0FBTyxRQUFRO0FBQ2IsV0FBTztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPLEtBQUs7QUFDVixRQUFJLE1BQU0sWUFBWTtBQUFBLEVBQ3hCO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
