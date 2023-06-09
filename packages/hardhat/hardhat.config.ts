import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import * as dotenv from "dotenv";
import "hardhat-abi-exporter";
import "hardhat-deploy";

import { HardhatUserConfig } from "hardhat/config";
dotenv.config();

// If not set, it uses ours Alchemy's default API key.
// You can get your own at https://dashboard.alchemyapi.io
const providerApiKey =
  process.env.ALCHEMY_API_KEY ?? "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";
// If not set, it uses the hardhat account 0 private key.
const deployerPrivateKey =
  process.env.DEPLOYER_PRIVATE_KEY ??
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const config: HardhatUserConfig = {
  abiExporter: {
    path: "../frontend/abis",
    clear: true,
    flat: true,
    runOnCompile: true,
    format: "json",
  },
  defaultNetwork: "localhost",
  typechain: {
    outDir: "../frontend/typechain-types",
    target: "ethers-v5",
  },
  namedAccounts: {
    deployer: {
      // By default, it will take the first account as deployer
      default: 0,
    },
  },
  networks: {
    arbitrum: {
      url: `https://arb-mainnet.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    arbitrumGoerli: {
      url: `https://arb-goerli.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    optimism: {
      url: `https://opt-mainnet.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    optimismGoerli: {
      url: `https://opt-goerli.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    polygonMumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "33I9SAEE65KY1HI2IAJF38UQ1X6Y4DWDDX",
  },
  solidity: "0.8.19",
};

export default config;
