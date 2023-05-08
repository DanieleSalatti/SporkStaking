import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "~~/components/Footer";
import Header from "~~/components/Header";
import { MemberTable } from "~~/components/MemberTable";
import { TAutoConnect, useAutoConnect } from "~~/hooks/scaffold-eth/useAutoConnect";

// todo: move this later scaffold config.  See TAutoConnect for comments on each prop
const tempAutoConnectConfig: TAutoConnect = {
  enableBurnerWallet: false,
  autoConnect: true,
};

const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json());

const Dashboard: NextPage = () => {
  useAutoConnect(tempAutoConnectConfig);
  const [filterWallet, setFilterWallet] = useState<string>("");

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/member?wallet=${filterWallet}`)
      .then(res => res.json())
      .then(data => {
        console.log("DASA data", data);
        setData(data.members);
        setTotal(data.total);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [filterWallet]);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="max-w-screen bg-gradient-to-r from-[#392E75] via-black to-black h-screen">
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
      <main className="flex flex-col">
        <section>
          <Header />
        </section>
        <section className="m-auto max-w-screen items-center flex-col py-10 text-slate-200 w-10/12">
          <h1 className="text-4xl font-extrabold tracking-tight text-white text-center mb-4">Members</h1>
          <div className="text-center mb-2">Found {total} members.</div>
          <div className="flex flex-row justify-center gap-4">
            <input
              type="text"
              placeholder="Search by wallet"
              className="rounded-md border-2 border-slate-200 p-2"
              onChange={e => setFilterWallet(e.target.value)}
              value={filterWallet}
            />
          </div>
          <div className="mt-4">
            {data && data.length > 0 ? <MemberTable members={data} /> : <p>No data to display.</p>}
          </div>
        </section>
        <section>
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
