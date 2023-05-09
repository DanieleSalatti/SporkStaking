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

export interface MemberTableProps {
  members?: Member[];
  setOrderByField: (fieldName: string) => void;
  setOrderByDirection: (direction: string) => void;
  orderByField: string;
  orderByDirection: string;
}

export const MemberTable: FC<MemberTableProps> = props => {
  const { setOrderByDirection, setOrderByField, orderByField, orderByDirection } = props;
  const [data, setData] = useState<Member[]>([]);

  const ArrowSortIcon: FC<{ isSorted: boolean; isSortedDesc: boolean; fieldName: string }> = props => {
    return props.isSorted ? (
      props.isSortedDesc ? (
        <a
          className="text-slate-200"
          href="#"
          onClick={() => {
            setOrderByField(props.fieldName);
            setOrderByDirection("asc");
          }}
        >
          ⬇
        </a>
      ) : (
        <a
          className="text-slate-200"
          href="#"
          onClick={() => {
            setOrderByField(props.fieldName);
            setOrderByDirection("desc");
          }}
        >
          ⬆
        </a>
      )
    ) : (
      <a
        className="opacity-20 text-slate-200"
        href="#"
        onClick={() => {
          setOrderByField(props.fieldName);
          setOrderByDirection("desc");
        }}
      >
        ⬇
      </a>
    );
  };

  const columnHelper = createColumnHelper<Member>();

  const columns = [
    columnHelper.accessor("first_name", {
      cell: info => info.getValue(),
      header: () => (
        <span>
          First Name{" "}
          <ArrowSortIcon
            isSorted={orderByField === "first_name"}
            isSortedDesc={orderByDirection === "desc"}
            fieldName={"first_name"}
          />
        </span>
      ),
    }),
    columnHelper.accessor("last_name", {
      cell: info => <i>{info.getValue()}</i>,
      header: () => (
        <span>
          Last Name{" "}
          <ArrowSortIcon
            isSorted={orderByField === "last_name"}
            isSortedDesc={orderByDirection === "desc"}
            fieldName={"last_name"}
          />
        </span>
      ),
    }),
    columnHelper.accessor("email", {
      cell: info => info.renderValue(),
      header: () => (
        <span>
          Email{" "}
          <ArrowSortIcon
            isSorted={orderByField === "email"}
            isSortedDesc={orderByDirection === "desc"}
            fieldName={"email"}
          />
        </span>
      ),
    }),
    columnHelper.accessor("country", {
      cell: info => <i>{info.getValue()}</i>,
      header: () => (
        <span>
          Country{" "}
          <ArrowSortIcon
            isSorted={orderByField === "country"}
            isSortedDesc={orderByDirection === "desc"}
            fieldName={"country"}
          />
        </span>
      ),
    }),
    columnHelper.accessor("wallet", {
      header: () => (
        <span>
          Wallet{" "}
          <ArrowSortIcon
            isSorted={orderByField === "wallet"}
            isSortedDesc={orderByDirection === "desc"}
            fieldName={"wallet"}
          />
        </span>
      ),
    }),
    columnHelper.accessor("amount", {
      header: () => (
        <span>
          Amount{" "}
          <ArrowSortIcon
            isSorted={orderByField === "amount"}
            isSortedDesc={orderByDirection === "desc"}
            fieldName={"amount"}
          />
        </span>
      ),
    }),
    columnHelper.accessor("percentage_share", {
      header: () => (
        <span>
          Percentage Share{" "}
          <ArrowSortIcon
            isSorted={orderByField === "percentage_share"}
            isSortedDesc={orderByDirection === "desc"}
            fieldName={"percentage_share"}
          />
        </span>
      ),
    }),
  ];

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
