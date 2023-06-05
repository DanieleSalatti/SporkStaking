import "~~/styles/globals.css";

import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { chain, WagmiConfig } from "wagmi";
import { wagmiClient } from "~~/services/web3/wagmiClient";
import { appChains } from "~~/services/web3/wagmiConnectors";

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <ThemeProvider defaultTheme="dark">
        <RainbowKitProvider chains={appChains.chains} theme={darkTheme()} initialChain={chain.polygon}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </ThemeProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthApp;
