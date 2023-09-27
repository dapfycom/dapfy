"use client";

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
import { ArrowUpDown, ChevronDown } from "lucide-react";
import * as React from "react";

import TokenImage from "@/components/TokenImage/TokenImage";
import { WrapEgldModal } from "@/components/WrapUnWrapEgld/WrapEgldModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { selectedNetwork } from "@/config/network";
import { routeNames } from "@/config/routes";
import useFilterPopularTokens from "@/hooks/useGetPopularTokens";
import useGetUserTokens from "@/hooks/useGetUserTokens";
import { useAppDispatch } from "@/hooks/useRedux";
import { setIsWrapEgldOpen } from "@/redux/dapp/dapp-slice";
import { IElrondAccountToken } from "@/types/elrond.interface";
import {
  formatBalance,
  formatBalanceDolar,
  formatPrecision,
} from "@/utils/functions/formatBalance";
import { orderBy } from "@/utils/functions/general";
import { numberWithCommas } from "@/utils/functions/numbers";
import Link from "next/link";

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
];

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<IElrondAccountToken>[] = [
  {
    accessorKey: "ticker",
    header: "Token",
    cell: ({ row }) => {
      const token = row.original;

      return (
        <div className="flex gap-2 items-center">
          {token.assets?.svgUrl && (
            <TokenImage src={token.assets.svgUrl} size={30} />
          )}
          <p>{token.ticker}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          className="-ml-4"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price: number = row.getValue("price");

      return (
        <div className="lowercase">
          {numberWithCommas(formatPrecision(price))}
        </div>
      );
    },
  },
  {
    accessorKey: "tokenBalance",
    header: ({ column }) => {
      return (
        <div>
          <Button
            className="-ml-4"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Balance
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const dispatch = useAppDispatch();
      const token = row.original;
      const onOpenEgldWrap = () => {
        dispatch(setIsWrapEgldOpen(true));
      };
      return (
        <div className="flex gap-3">
          <div className="font-medium">
            <div className="flex">
              <p className="mr-[5px]">{formatBalance(token)}</p>
              <p>{token.ticker}</p>
            </div>
            {token.price && (
              <p className="text-sm text-muted-foreground">
                ≈ ${formatBalanceDolar(token, token.price)}
              </p>
            )}
          </div>

          {token.identifier === selectedNetwork.tokensID.egld ||
          token.identifier === selectedNetwork.tokensID.wegld ? (
            <>
              {token.identifier === selectedNetwork.tokensID.egld ? (
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className="text-xs"
                  onClick={onOpenEgldWrap}
                >
                  Wrap
                </Button>
              ) : (
                <Button variant={"outline"} size={"sm"} className="text-xs">
                  Unwrap
                </Button>
              )}
            </>
          ) : (
            <Link href={routeNames.swap}>
              <Button variant={"outline"} size={"sm"} className="text-xs">
                Swap
              </Button>
            </Link>
          )}
        </div>
      );
    },
  },
];

interface IProps {
  data: IElrondAccountToken[];
}

// export const HoldingsTable = () => {
//   const [egldPrice] = useGetTokenPrice("EGLD");
//   const { userTokens: tableData } = useGetUserTokens();
//   const { elrondToken: egldData } = useGetElrondToken("EGLD");
//   const [data, setData] = React.useState<any[]>([]);
//   // React.useEffect(() => {
//   //   const newData: any[] = [];
//   //   tableData.forEach((token) => {
//   //     if (
//   //       selectedNetwork.tokensID.usdt === token.identifier ||
//   //       selectedNetwork.tokensID.busd === token.identifier
//   //     ) {
//   //       //force price for usdt and busd
//   //       const price = 1;
//   //       newData.push({
//   //         tokenBalance: formatBalanceDolar(token, price),
//   //         ...token,
//   //         price: price,
//   //       });
//   //     } else {
//   //       newData.push({
//   //         tokenBalance: token.price
//   //           ? formatBalanceDolar(token, token.price)
//   //           : 0,
//   //         ...token,
//   //       });
//   //     }
//   //   });

//   //   const orderData = orderBy(newData, "desc", "tokenBalance");

//   //   // const EgldData = {
//   //   //   tokenBalance: formatBalance(egldData, false, 3),

//   //   //   price: egldPrice,

//   //   //   balance: egldData.balance,
//   //   // };

//   //   // orderData.unshift(EgldData);
//   //   setData(orderData);
//   // }, [tableData, egldData, egldPrice]);

//   return <ContentTable tableData={data} />;
// };

export function ContentTable() {
  const dispatch = useAppDispatch();

  const { userTokens: tokensData } = useGetUserTokens();
  const { popularTokens: maiarTokens } = useFilterPopularTokens(
    tokensData.map((token) => token.identifier)
  );

  const data = React.useMemo(() => {
    // filter only maiar tokens
    const maiarData = tokensData.filter((token) =>
      maiarTokens.includes(token.identifier)
    );

    const newData = maiarData.map((token) => {
      if (
        selectedNetwork.tokensID.usdt === token.identifier ||
        selectedNetwork.tokensID.busd === token.identifier
      ) {
        //force price for usdt and busd
        const price = 1;
        return {
          tokenBalance: formatBalanceDolar(token, price),
          ...token,
          price: price,
        };
      } else {
        return {
          tokenBalance: token.price
            ? formatBalanceDolar(token, token.price)
            : 0,
          ...token,
        };
      }
    });
    const data1 = orderBy(newData, "desc", "tokenBalance");

    const egldIndex = tokensData.findIndex(
      (token) => token.identifier === selectedNetwork.tokensID.egld
    );
    if (egldIndex !== -1) {
      const egld = tokensData[egldIndex];
      //add egld token to first position
      data1.unshift(egld);
    }

    return data1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokensData.length, maiarTokens.length]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter tokens..."
            value={
              (table.getColumn("ticker")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("ticker")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
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
      <WrapEgldModal />
    </>
  );
}
