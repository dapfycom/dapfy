import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { selectedNetwork } from "@/config/network";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import { useAppSelector } from "@/hooks/useRedux";
import { IFlipBet } from "@/types/flip.inteface";
import { formatAddress } from "@/utils/functions/formatAddress";
import { formatBalance } from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { selectCoinFlipTokenStr } from "@/views/CoinFlipView/lib/con-flip-slice";
import { selectChoise } from "@/views/CoinFlipView/lib/functions";
interface IProps {
  data: IFlipBet[];
}

const BetsTable = ({ data }: IProps) => {
  const flipCoinTokenStr = useAppSelector(selectCoinFlipTokenStr);
  const { elrondToken } = useGetElrondToken(flipCoinTokenStr);

  return (
    <div className="overflow-auto">
      <div className="border-b border-gray-300" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Players</TableHead>
            <TableHead>Txn</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Choice</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((rowData, index) => {
            return (
              <TableRow key={rowData.txHash}>
                <TableCell className="font-medium">
                  {formatAddress(rowData.address)}
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
                <TableCell>
                  {formatBalance({
                    balance: rowData.betAmount,
                    decimals: elrondToken?.decimals,
                  })}{" "}
                  {formatTokenI(flipCoinTokenStr)}
                </TableCell>
                <TableCell>{selectChoise(rowData.isHeadBet)}</TableCell>
                <TableCell>{selectChoise(rowData.result)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
    // <div>
    //   {" "}
    //   <Divider borderColor="dark.300" />
    //   <TableContainer overflowY="auto" overflowX={"auto"}>
    //     <Table variant="simple" overflowX={"auto"}>
    //       <Thead>
    //         <Tr>
    //           <Th px={"10px"} py={"12px"}>
    //             Players
    //           </Th>
    //           <Th px={"10px"} py={"12px"}>
    //             Txn
    //           </Th>
    //           <Th px={"10px"} py={"12px"}>
    //             Amount
    //           </Th>
    //           <Th px={"10px"} py={"12px"}>
    //             Choice
    //           </Th>
    //           <Th px={"10px"} py={"12px"}>
    //             Result
    //           </Th>
    //           {/* <Th px={"10px"} py={"12px"}>
    //             Payoff
    //           </Th> */}
    //         </Tr>
    //       </Thead>
    //       <Tbody>
    //         {data.map((rowData, index) => {
    //           return (
    //             <Tr key={index}>
    //               <Td px={"10px"} color="primary">
    //                 {formatAddress(rowData.address)}
    //               </Td>
    //               <Td px={"10px"}>
    //                 <Link
    //                   href={`${selectedNetwork.network.explorerAddress}/transactions/${rowData.txHash}`}
    //                   isExternal
    //                 >
    //                   {rowData.txHash.substring(0, 10) + "..."}
    //                 </Link>{" "}
    //               </Td>
    //               <Td px={"10px"}>
    //                 {formatBalance({
    //                   balance: rowData.betAmount,
    //                   decimals: elrondToken?.decimals,
    //                 })}{" "}
    //                 {formatTokenI(flipCoinTokenStr)}
    //               </Td>
    //               <Td px={"10px"}>{selectChoise(rowData.isHeadBet)}</Td>
    //               <Td px={"10px"}>{selectChoise(rowData.result)}</Td>
    //               {/* <Td px={"10px"}>364.32 CRO</Td> */}
    //             </Tr>
    //           );
    //         })}
    //       </Tbody>
    //     </Table>
    //   </TableContainer>
    // </div>
  );
};

export default BetsTable;
