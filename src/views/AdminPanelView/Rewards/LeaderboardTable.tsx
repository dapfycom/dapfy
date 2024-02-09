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
import React from "react";

import { DatePicker } from "@/components/ui-system/DatePicker/DatePicker";
import { Button } from "@/components/ui/button";
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
import { useGetMvxEpoch } from "@/hooks/useGetStats";
import { fetchIsUserUsedDapfyTool } from "@/services/rest/dapfy-api/use-sc-tool";
import { IUserToReward } from "@/types/rewards.interface";
import { formatAddress } from "@/utils/functions/formatAddress";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useGetRewardsLeaderboard } from "./hooks";

export const columns: ColumnDef<IUserToReward>[] = [
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "user",
    header: "Address",
    cell: ({ row }) => {
      const address = (row.getValue("user") as any).address;
      return (
        <div className="capitalize">
          <a
            href={
              selectedNetwork.network.explorerAddress + "/accounts/" + address
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            {formatAddress(address)}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      console.log({ row: row.original });

      return <CheckInteraction dataInfo={row.original} />;
    },
  },
];

const CheckInteraction = ({ dataInfo }: { dataInfo: IUserToReward }) => {
  const { nextEpoch, previousEpoch } = useGetMvxEpoch();

  return (
    <div className="capitalize">
      <Button
        size={"xs"}
        onClick={async () => {
          const interacted = fetchIsUserUsedDapfyTool({
            address: dataInfo.user.address,
            from: previousEpoch!.toISOString(),
            to: nextEpoch!.toISOString(),
          });

          toast.promise(
            interacted,
            {
              loading: "Loading",
              success: (data) =>
                data.data
                  ? `🔥 User ${dataInfo.username} has already interacted with Dapfy`
                  : ` 😔 User ${dataInfo.username} has not interacted with Dapfy yet`,
              error: (err) => `This just happened: ${err.toString()}`,
            },
            {
              success: {
                duration: 70000,
              },
            }
          );
        }}
      >
        Check Defi
      </Button>
    </div>
  );
};

const LeaderboardTable = ({ data }: { data: IUserToReward[] }) => {
  const router = useRouter();
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

  const handleChangeDate = (date: Date) => {
    const formatedDate = format(date, "yyyy-LL-dd");
    router.push("?date=" + formatedDate);
  };

  return (
    <div className="flex space-x-4 pb-4 px-3 max-w-[750px] mx-auto">
      <div className="w-full">
        <div className="flex items-center py-4 gap-3 flex-col  sm:flex-row">
          <Input
            placeholder="Filter usernames..."
            value={
              (table.getColumn("username")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("username")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex sm:ml-auto">
            <DatePicker
              presetDays={[
                {
                  label: "Today",
                  value: 0,
                },
                {
                  label: "Yesterday",
                  value: -1,
                },

                {
                  label: "A week ago",
                  value: -7,
                },
              ]}
              defaultValue={new Date()}
              onChange={handleChangeDate}
            />
          </div>
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
    </div>
  );
};

const TableContainer = () => {
  const { leaderboard: data } = useGetRewardsLeaderboard();

  return <LeaderboardTable data={data} />;
};

export default TableContainer;
