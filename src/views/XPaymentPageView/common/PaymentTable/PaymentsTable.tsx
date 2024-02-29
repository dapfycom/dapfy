"use client";

import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { selectedNetwork } from "@/config/network";
import { formatAddress } from "@/utils/functions/formatAddress";
import { formatBalance } from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { IPayment } from "../../utils/functions";
import { useGetPayments } from "../../utils/hooks";

export const columns: ColumnDef<IPayment>[] = [
  {
    accessorKey: "txHash",
    header: "Hash",
    cell: ({ row }) => {
      const original = row.original;

      return (
        <div>
          <a
            href={`${selectedNetwork.network.explorerAddress}/transactions/${original.txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            {formatAddress(original.txHash)}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "receiver",
    header: "Receiver",
    cell: ({ row }) => (
      <div>
        <a
          href={`${
            selectedNetwork.network.explorerAddress
          }/accounts/${row.getValue("receiver")}`}
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          {formatAddress(row.getValue("receiver"))}
        </a>
      </div>
    ),
  },

  {
    accessorKey: "sender",
    header: "Sender",
    cell: ({ row }) => (
      <div>
        {" "}
        <a
          href={`${
            selectedNetwork.network.explorerAddress
          }/accounts/${row.getValue("sender")}`}
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          {formatAddress(row.getValue("sender"))}{" "}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date: Date = row.getValue("date");

      return <div> {date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row, column, cell }) => {
      const original = row.original;

      // // Format the amount as a dollar amount
      // const formatted = new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // }).format(amount);

      return (
        <div className="text-right font-medium">
          {formatBalance({
            balance: original.amount,
            decimals: original.decimals,
          })}{" "}
          {formatTokenI(original.tokenIdentifier)}
        </div>
      );
    },
  },
];

function PaymentsTable({
  data,
  isLoading,
}: {
  data: IPayment[];
  isLoading: boolean;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, //initial page index
    pageSize: 20, //default page size
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function PaymentTableContainer() {
  const { payments, isLoading } = useGetPayments();
  return <PaymentsTable data={payments} isLoading={isLoading} />;
}
export default PaymentTableContainer;
