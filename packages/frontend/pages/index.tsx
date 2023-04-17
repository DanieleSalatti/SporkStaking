import type { NextPage } from "next";
import Head from "next/head";
import Footer from "~~/components/Footer";
import Header from "~~/components/Header";
import MainCard from "~~/components/MainCard";
import { TAutoConnect, useAutoConnect } from "~~/hooks/scaffold-eth/useAutoConnect";

// todo: move this later scaffold config.  See TAutoConnect for comments on each prop
const tempAutoConnectConfig: TAutoConnect = {
  enableBurnerWallet: false,
  autoConnect: true,
};

const Home: NextPage = () => {
  useAutoConnect(tempAutoConnectConfig);

  return (
    <div className="max-w-screen bg-gradient-to-r from-[#392E75] via-black to-black">
      <Head>
        <title>SporkDAO $SPORK Staking App</title>
        <meta name="description" content="SPORK staker created with 🏗 scaffold-eth" />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://images.squarespace-cdn.com/content/v1/614b990e002ad146a5478e8b/244c7b82-0ee2-45ea-830f-50c450ed2985/favicon.ico?format=100w"
        ></link>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="https://images.squarespace-cdn.com/content/v1/614b990e002ad146a5478e8b/244c7b82-0ee2-45ea-830f-50c450ed2985/favicon.ico?format=100w"
        ></link>
        <link rel="canonical" href="https://stake.ethdenver.com" />
        <meta property="og:site_name" content="SporkDAO Spork Staking App"></meta>
        <meta
          property="og:image"
          content="https://images.squarespace-cdn.com/content/v1/614b990e002ad146a5478e8b/1658775809172-JATIARTTTVEO3ZN5KDVW/SPORKDAO_LOVE.png?format=300w"
        ></meta>
        <meta
          name="twitter:image"
          content="https://images.squarespace-cdn.com/content/v1/614b990e002ad146a5478e8b/1658775809172-JATIARTTTVEO3ZN5KDVW/SPORKDAO_LOVE.png?format=300w"
        ></meta>
        <meta name="twitter:url" content="https://stake.ethdenver.com"></meta>
        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:description" content="SporkDAO members can stake and unstake their spork here!"></meta>
        <meta name="description" content="SporkDAO members can stake and unstake their spork here!"></meta>
      </Head>
      <main>
        <section>
          <Header />
        </section>
        <section className="flex max-w-xs m-auto md:max-w-screen items-center flex-col py-10">
          <MainCard />
        </section>
        <section>
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default Home;
