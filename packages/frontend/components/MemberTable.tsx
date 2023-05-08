import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { FC, useEffect, useState } from "react";

type Member = {
  first_name: string;
  last_name: string;
  country: string;
  email: string;
  wallet: string;
  amount: string;
  percentage_share: string;
};

const columnHelper = createColumnHelper<Member>();

const columns = [
  columnHelper.accessor("first_name", {
    cell: info => info.getValue(),
    header: () => <span>First Name</span>,
  }),
  columnHelper.accessor("last_name", {
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor("email", {
    cell: info => info.renderValue(),
    header: () => <span>Email</span>,
  }),
  columnHelper.accessor("country", {
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Country</span>,
  }),
  columnHelper.accessor("wallet", {
    header: () => <span>Wallet</span>,
  }),
  columnHelper.accessor("amount", {
    header: () => <span>Amount</span>,
  }),
  columnHelper.accessor("percentage_share", {
    header: () => <span>Percentage Share</span>,
  }),
];

export interface MemberTableProps {
  members?: Member[];
}

export const MemberTable: FC<MemberTableProps> = props => {
  console.log("DASA ", props.members);
  const [data, setData] = useState<Member[]>([]);

  useEffect(() => {
    setData(props.members ? [...props.members] : []);
  }, [props.members]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="p-2 w-full flex justify-center">
        <table className="w-10/12">
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
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
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
    </>
  );
};
