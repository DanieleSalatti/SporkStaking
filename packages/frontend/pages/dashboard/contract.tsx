import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import Footer from "~~/components/Footer";
import Header from "~~/components/Header";
import { TAutoConnect, useAutoConnect } from "~~/hooks/scaffold-eth/useAutoConnect";

// todo: move this later scaffold config.  See TAutoConnect for comments on each prop
const tempAutoConnectConfig: TAutoConnect = {
  enableBurnerWallet: false,
  autoConnect: true,
};

type ContractLog = {
  amount: string;
  created_at?: Date;
};

export interface ContractTableProps {
  contract?: ContractLog[];
  setOrderByField: (fieldName: string) => void;
  setOrderByDirection: (direction: string) => void;
  orderByField: string;
  orderByDirection: string;
}

const MemberDetails: FC<ContractTableProps> = props => {
  useAutoConnect(tempAutoConnectConfig);
  const router = useRouter();
  const [data, setData] = useState<ContractLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  const [showCalendar, setShowCalendar] = useState(false);

  const handleSelect = (ranges: any) => {
    console.log(ranges);
    setSelectionRange(ranges.selection);
    setShowCalendar(false);
  };

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    endDate: new Date(),
    key: "selection",
  });

  const columnHelper = createColumnHelper<ContractLog>();

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/contract?startDate=${selectionRange.startDate.toISOString().split("T")[0]}&endDate=${
        selectionRange.endDate.toISOString().split("T")[0]
      }`,
    )
      .then(res => res.json())
      .then(data => {
        setData(data.stakeLog);
        setTotal(data.total);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [selectionRange]);

  const columns = [
    columnHelper.accessor("amount", {
      header: () => <span>Amount</span>,
    }),
    columnHelper.accessor("created_at", {
      header: () => <span>Date</span>,
    }),
  ];

  useEffect(() => {
    setData(props.contract ? [...props.contract] : []);
  }, [props.contract]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // convert the data in a format that can be used with rechart for a linechart
  const chartData = data.map(d => {
    return {
      created_at: d.created_at!.toString().split(" ")[0],
      amount: d.amount,
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
          <div className="text-center">
            <div className={`text-center ${showCalendar ? "hidden" : ""}`}>
              <button
                className="rounded-md border-2 border-slate-200 p-2 text-black bg-white"
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                Date range: {selectionRange.startDate.toISOString().split("T")[0]} -{" "}
                {selectionRange.endDate.toISOString().split("T")[0]}
              </button>
            </div>
            <div className={`text-center ${showCalendar ? "" : "hidden"}`}>
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                className="rounded-md border-2 border-slate-200 text-black"
              />
            </div>
          </div>
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
