"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useAuthentication from "@/hooks/useAuthentication";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { flipCoin } from "@/views/CoinFlipView/lib/calls";
import {
  changeUserCoinSide,
  selectCoinFlipBetAmount,
  selectCoinFlipSide,
  selectCoinFlipTokenStr,
} from "@/views/CoinFlipView/lib/con-flip-slice";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { mutate } from "swr";
import ResultModal from "../../ResultModal/ResultModal";

const GameActions = () => {
  const dispatch = useAppDispatch();
  const userAddress = useSelector(selectUserAddress);
  const selectedSide = useAppSelector(selectCoinFlipSide);
  const tokenStr = useAppSelector(selectCoinFlipTokenStr);
  const betAmount = useAppSelector(selectCoinFlipBetAmount);
  const [txData, setTxData] = useState("");
  const [sessionId, setSessionId] = React.useState("");
  const { elrondToken } = useGetElrondToken(tokenStr);
  const { isLoggedIn, handleConnect } = useAuthentication();
  const onSuccess = () => {
    if (transactions) {
      setTxData(transactions.length > 0 ? transactions[0]?.hash || "" : "");
      mutate([tokenStr, userAddress]);
    }
  };

  const { transactions } = useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess,
  });

  const handleFilp = async () => {
    if (betAmount) {
      console.log("elrondToken", elrondToken);

      const res = await flipCoin(selectedSide, elrondToken, betAmount);
      setSessionId(res?.sessionId);
    }
  };
  const handleChangeCoinSide = () => {
    dispatch(changeUserCoinSide(!selectedSide));
  };

  const handleClose = () => {
    setTxData("");
  };

  const txSuccess = Boolean(txData);
  return (
    <>
      {" "}
      <ResultModal isOpen={txSuccess} onClose={handleClose} txHash={txData} />
      <Card className="text-left pt-6">
        <CardContent>
          <div className="flex flex-col w-full gap-6">
            <div className="flex gap-2 w-full">
              <p>2.</p>
              <div className="flex flex-col gap-2 flex-1">
                <p>Select side of coin</p>
                <div className="flex w-full gap-4">
                  <Button
                    className="w-full"
                    variant={selectedSide ? "secondary" : "outline"}
                    onClick={handleChangeCoinSide}
                  >
                    Heads
                  </Button>
                  <Button
                    className="w-full"
                    variant={selectedSide ? "outline" : "secondary"}
                    onClick={handleChangeCoinSide}
                  >
                    Tail
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <p>3.</p>
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex w-full gap-4">
                  <Button
                    className="w-full "
                    variant={"secondary"}
                    onClick={isLoggedIn ? handleFilp : handleConnect}
                  >
                    {isLoggedIn
                      ? "Place bet and flip coin"
                      : "Connect your wallet to flip coin"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
    // <>
    //   {" "}
    //   <ResultModal isOpen={txSuccess} onClose={handleClose} txHash={txData} />
    //   <Flex
    //     flexDir={"column"}
    //     bg="dark.600"
    //     border={"1px"}
    //     borderColor="dark.300"
    //     w="full"
    //     borderRadius={"lg"}
    //     px="20px"
    //     py="35px"
    //     gap="32px"
    //     flex={1}
    //     h="full"
    //   >
    //     <Flex alignItems={"flex-start"} gap={"15px"}>
    //       <Text color="white">2.</Text>
    //       <Flex flexDir={"column"} flex={1}>
    //         <Text mb={"12px"} color="white">
    //           Select side of coin
    //         </Text>
    //         <Flex w="full" gap={3}>
    //           <Button
    //             variant={selectedSide ? "solid" : "outline"}
    //             flex={1}
    //             onClick={handleChangeCoinSide}
    //           >
    //             Heads
    //           </Button>
    //           <Button
    //             variant={selectedSide ? "outline" : "solid"}
    //             flex={1}
    //             onClick={handleChangeCoinSide}
    //           >
    //             Tail
    //           </Button>
    //         </Flex>
    //       </Flex>
    //     </Flex>
    //     <Flex gap="15px">
    //       <Text color="white">3.</Text>
    //       <ActionButton flex={1} onClick={handleFilp}>
    //         Place bet and flip coin{" "}
    //       </ActionButton>
    //     </Flex>
    //   </Flex>
    // </>
  );
};

export default GameActions;
