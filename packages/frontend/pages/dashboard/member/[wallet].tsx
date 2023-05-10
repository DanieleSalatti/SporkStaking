import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import Footer from "~~/components/Footer";
import Header from "~~/components/Header";
import { TAutoConnect, useAutoConnect } from "~~/hooks/scaffold-eth/useAutoConnect";

// todo: move this later scaffold config.  See TAutoConnect for comments on each prop
const tempAutoConnectConfig: TAutoConnect = {
  enableBurnerWallet: false,
  autoConnect: true,
};

type MemberStakeLog = {
  wallet: string;
  total_amount: string;
  created_at?: Date;
};

export interface MemberTableProps {
  member?: MemberStakeLog[];
  setOrderByField: (fieldName: string) => void;
  setOrderByDirection: (direction: string) => void;
  orderByField: string;
  orderByDirection: string;
}

const MemberDetails: FC<MemberTableProps> = props => {
  useAutoConnect(tempAutoConnectConfig);
  const router = useRouter();
  const { wallet } = router.query;
  console.log(wallet);
  const [data, setData] = useState<MemberStakeLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  const columnHelper = createColumnHelper<MemberStakeLog>();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/member/${wallet}`)
      .then(res => res.json())
      .then(data => {
        console.log("DASA data", data);
        setData(data.stakeLog);
        setTotal(data.total);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [wallet]);

  const columns = [
    columnHelper.accessor("total_amount", {
      header: () => <span>Amount</span>,
    }),
    columnHelper.accessor("created_at", {
      header: () => <span>Date</span>,
    }),
  ];

  useEffect(() => {
    setData(props.member ? [...props.member] : []);
  }, [props.member]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // convert the data in a format that can be used with rechart for a linechart
  const chartData = data.map(d => {
    return {
      created_at: d.created_at!.toString().split(" ")[0],
      amount: d.total_amount,
    };
  });

  return (
    <div className="max-w-screen bg-gradient-to-r from-[#392E75] via-black to-black h-full">
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
        <section className="max-w-screen m-auto md:max-w-screen items-center flex-col py-10 text-slate-200  w-10/12">
          <div className="p-2 w-full justify-center items-center flex">
            <LineChart width={900} height={450} data={chartData}>
              <Line type="monotone" dataKey="amount" stroke="#ddd" />
              <CartesianGrid stroke="#ddd" />
              <XAxis dataKey="created_at" stroke="#ddd" />
              <YAxis stroke="#ddd" />
            </LineChart>
          </div>
          <div className="p-2 w-full justify-center">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="text-center">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                {table.getFooterGroups().map(footerGroup => (
                  <tr key={footerGroup.id}>
                    {footerGroup.headers.map(header => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </tfoot>
            </table>
            <div className="h-4" />
          </div>
        </section>
        <section>
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default MemberDetails;
