import * as dotenv from "dotenv";
dotenv.config();
import { ethers, Wallet } from "ethers";
import QRCode from "qrcode";
import { config } from "hardhat";

async function main() {
  const privateKey = process.env.DEPLOYER_PRIVATE_KEY;

  if (!privateKey) {
    console.log(
      "🚫️ You don't have a deployer account. Run `yarn generate` first"
    );
    return;
  }

  // Get account from private key.
  const wallet = new Wallet(privateKey);
  const address = wallet.address;
  console.log(
    await QRCode.toString(address, { type: "terminal", small: true })
  );
  console.log("Public address:", address, "\n");

  // Balance on each network
  const availableNetworks = config.networks;
  for (const networkName in availableNetworks) {
    try {
      const network = availableNetworks[networkName];
      // @ts-ignore
      if (!network?.url) continue;
      // @ts-ignore
      const provider = new ethers.providers.JsonRpcProvider(network.url);
      const balance = await provider.getBalance(address);
      console.log("--", networkName, "-- 📡");
      console.log("   balance:", +ethers.utils.formatEther(balance));
      console.log("   nonce:", +(await provider.getTransactionCount(address)));
    } catch (e) {
      console.log("Can't connect to network", networkName);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
