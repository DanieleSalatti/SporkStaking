import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { burnerWalletConfig } from "./wagmi-burner/burnerWalletConfig";

import {
  braveWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
/**
 * chains for the app
 */
export const appChains = configureChains(
  [
    chain.polygon,
    // chain.polygonMumbai,

    // todo replace with config instead of env
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten, chain.polygonMumbai]
      : []),
  ],
  [
    alchemyProvider({
      // ToDo. Move to .env || scaffold config
      // This is ours Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF",
    }),
    publicProvider(),
  ],
);

/**
 * list of burner wallet compatable chains
 */
export const burnerChains = configureChains(
  [chain.localhost, chain.hardhat],
  [
    alchemyProvider({
      // ToDo. Move to .env || scaffold config
      // This is ours Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF",
    }),
    publicProvider(),
  ],
);

/**
 * wagmi connectors for the wagmi context
 */

export const wagmiConnectors = connectorsForWallets([
  {
    groupName: "Supported Wallets",
    wallets: [
      rainbowWallet({ chains: appChains.chains }),
      metaMaskWallet({ chains: appChains.chains, shimDisconnect: true }),
      walletConnectWallet({ chains: appChains.chains }),
      ledgerWallet({ chains: appChains.chains }),
      braveWallet({ chains: appChains.chains }),
      coinbaseWallet({ appName: "scaffold-eth", chains: appChains.chains }),

      burnerWalletConfig({ chains: burnerChains.chains }),
    ],
  },
]);
