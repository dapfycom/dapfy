import { Skeleton } from "@/components/ui/skeleton";
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
import { Address } from "@multiversx/sdk-core/out";
import { IHistoryData } from "../../utils/interface";

interface IProps {
  data: IHistoryData[];
  isLoading: boolean;
}
const HistoryTable = ({ data, isLoading }: IProps) => {
  console.log({ data });

  return (
    <div className="overflow-auto">
      {isLoading ? (
        <div className="gap-8 flex flex-col">
          <Skeleton className="min-h-[300px]" />
        </div>
      ) : (
        <>
          {data.length > 0 ? (
            <>
              <div className="border-b border-gray-300" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Creator</TableHead>
                    <TableHead>Challenger</TableHead>
                    <TableHead>Winner</TableHead>
                    <TableHead>Txn</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((rowData, index) => {
                    return (
                      <TableRow key={rowData.txHash}>
                        <TableCell className="font-medium">
                          {rowData.creator.username ||
                            (rowData.creator.address !== Address.Zero().bech32()
                              ? formatAddress(rowData.creator.address)
                              : "Unknown")}
                        </TableCell>
                        <TableCell className="font-medium">
                          {rowData.challenger.username ||
                            (rowData.challenger.address !==
                            Address.Zero().bech32()
                              ? formatAddress(rowData.challenger.address)
                              : "Unknown")}
                        </TableCell>

                        <TableCell className="font-medium">
                          {rowData.winner.username ||
                            (rowData.winner.address !== Address.Zero().bech32()
                              ? formatAddress(rowData.winner.address)
                              : "Unknown")}
                        </TableCell>
                        <TableCell>
                          <a
                            href={`${selectedNetwork.network.explorerAddress}/transactions/${rowData.txHash}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {rowData.txHash.substring(0, 10) + "..."}
                          </a>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </>
          ) : (
            <div className="w-full border rounded min-h-[300px] flex justify-center items-center">
              No history yet
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HistoryTable;
