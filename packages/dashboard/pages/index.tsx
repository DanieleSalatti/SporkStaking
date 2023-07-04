import type { NextPage } from "next";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Config } from "sst/node/config";
import { useAccount } from "wagmi";
import Footer from "~~/components/Footer";
import GateStatus from "~~/components/GateStatus";
import CustomHead from "~~/components/Head";
import Header from "~~/components/Header";
import { MemberTable } from "~~/components/MemberTable";
import { TAutoConnect, useAutoConnect } from "~~/hooks/scaffold-eth/useAutoConnect";

// todo: move this later scaffold config.  See TAutoConnect for comments on each prop
const tempAutoConnectConfig: TAutoConnect = {
  enableBurnerWallet: false,
  autoConnect: true,
};

export async function getServerSideProps() {
  console.log(Config.NEXT_PUBLIC_WHITELISTED_ADDRESSES);

  return { props: { loaded: true, whitelist: Config.NEXT_PUBLIC_WHITELISTED_ADDRESSES.split(",") } };
}

interface Props {
  whitelist: string[];
  loaded: boolean;
}

const Dashboard: NextPage<Props> = (props: Props) => {
  const { whitelist, loaded } = props;

  useAutoConnect(tempAutoConnectConfig);
  const [filterWallet, setFilterWallet] = useState<string>("");

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [orderByField, setOrderByField] = useState("last_name");
  const [orderByDirection, setOrderByDirection] = useState("asc");

  const { address, isConnected } = useAccount();

  console.log("DASA whitelist", whitelist);

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/member?wallet=${filterWallet}&page=${pageIndex}&limit=${pageSize}&orderByField=${orderByField}&orderByDirection=${orderByDirection}`,
    )
      .then(res => res.json())
      .then(data => {
        setData(data.members);
        setTotal(data.total);
        setPageCount(Math.ceil(data.total / pageSize));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [filterWallet, pageIndex, pageSize, orderByField, orderByDirection]);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  if (!isConnected || !address) {
    // ask user to connect using the navbar
    return <GateStatus status="not_connected" />;
  }
  if (isConnected) {
    if (!loaded) {
      return <GateStatus status="loading" />;
    }
    // check if address is whitelisted
    if (!whitelist.includes(address)) {
      return <GateStatus status="not_allowed" />;
    }
  }

  return (
    <div className="max-w-screen bg-gradient-to-r from-[#392E75] via-black to-black h-full">
      <CustomHead />
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
              className="rounded-md border-2 border-slate-200 p-2 text-black"
              onChange={e => setFilterWallet(e.target.value)}
              value={filterWallet}
            />
          </div>
          <div className="mt-4">
            {isLoading && <div className="text-center">Loading...</div>}
            {data && data.length > 0 && (
              <MemberTable
                members={data}
                orderByField={orderByField}
                setOrderByField={setOrderByField}
                orderByDirection={orderByDirection}
                setOrderByDirection={setOrderByDirection}
              />
            )}
            {!isLoading && data && data.length === 0 && <div className="text-center">No data to display.</div>}
            <div className="flex items-center gap-2 justify-center mt-8">
              <button className="border rounded p-1" onClick={() => setPageIndex(0)} disabled={pageIndex === 0}>
                {"<<"}
              </button>
              <button
                className="border rounded p-1"
                onClick={() => setPageIndex(pageIndex - 1)}
                disabled={pageIndex === 0}
              >
                {"<"}
              </button>
              <button
                className="border rounded p-1"
                onClick={() => setPageIndex(pageIndex + 1)}
                disabled={pageIndex === pageCount - 1}
              >
                {">"}
              </button>
              <button
                className="border rounded p-1"
                onClick={() => setPageIndex(pageCount - 1)}
                disabled={pageIndex === pageCount - 1}
              >
                {">>"}
              </button>
              <span className="flex items-center gap-1">
                <div>Page</div>
                <strong>
                  {pageIndex + 1} of {pageCount}
                </strong>
              </span>
              <span className="flex items-center gap-1">
                | Go to page:
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    setPageIndex(page);
                  }}
                  className="border p-1 rounded w-16"
                />
              </span>
              <select
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
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
