import { Button } from "@/components/ui/button";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { openLogin } from "@/redux/dapp/dapp-slice";
import { SorSwap } from "@/types/ashswap.interface";
import { setElrondBalance } from "@/utils/functions/formatBalance";
import { calculateSlipageAmount } from "@/utils/functions/tokens";
import { submitSwap } from "@/views/SwapAggregator/lib/calls";
import { useGetAggregate } from "@/views/SwapAggregator/lib/hooks";
import {
  selectFromField,
  selectSlippage,
} from "@/views/SwapAggregator/lib/swap-slice";

import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import React, { useState } from "react";

const Realistic = React.lazy(() => import("@/components/Conffeti/Realistic"));

const SubmitButton = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useGetLoginInfo();
  const fromField = useAppSelector(selectFromField);
  const slippage = useAppSelector(selectSlippage);
  const { data: aggregatorData } = useGetAggregate();
  const [sessionId, setSessionId] = React.useState<string | null>("");
  const [txSuccess, setTxSuccess] = useState(false);
  const { elrondToken: fromElrondToken } = useGetElrondToken(
    fromField.selectedToken
  );
  const onSuccess = React.useCallback(() => {
    setTxSuccess(true);
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  }, []);

  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess,

    onFail: (transactionId: string | null, errorMessage?: string) => {
      console.error("transactionId", transactionId);
      console.error("errorMessage", errorMessage);
    },
  });

  const handleSwap = async () => {
    if (!isLoggedIn) {
      dispatch(openLogin(true));
    } else {
      console.log({ aggregatorData });

      if (aggregatorData?.returnAmountWithDecimal) {
        const amountWithSlippage = calculateSlipageAmount(
          slippage,
          aggregatorData?.returnAmountWithDecimal
        );
        if (aggregatorData) {
          setTxSuccess(false);

          if (!aggregatorData?.routes) throw new Error("No routes");

          const sorSwap: SorSwap[] = aggregatorData?.routes[0].hops.map(
            (hop, index) => {
              const tokenInDecimals = hop.pool.allTokens.find(
                (t) => t.address === hop.tokenIn
              )?.decimal;
              const tokenOutDecimals = hop.pool.allTokens.find(
                (t) => t.address === hop.tokenOut
              )?.decimal;

              const swapItem = aggregatorData.swaps.find(
                (s, hopIndex) => hopIndex === index
              );
              if (!swapItem) throw new Error("No swap item");
              if (
                swapItem.assetIn !== hop.tokenIn ||
                swapItem.assetOut !== hop.tokenOut
              )
                throw new Error("Missmatch between routs and swaps");

              const data: SorSwap = {
                ...swapItem,
                amount: setElrondBalance(hop.tokenInAmount, tokenInDecimals),
              };
              return data;
            }
          );
          const res = await submitSwap(
            aggregatorData.tokenOut,
            amountWithSlippage.toFixed(0),
            sorSwap,
            fromField.selectedToken,
            aggregatorData.swapAmountWithDecimal
          );

          setSessionId(res?.sessionId);
        }
      } else {
        throw new Error("No return amount with decimals");
      }
    }
  };

  let buttonText = isLoggedIn
    ? fromField.value !== ""
      ? "Confirm"
      : "Enter an amount"
    : "Connect wallet";
  return (
    <>
      {txSuccess && <Realistic />}
      <Button
        onClick={handleSwap}
        className="w-full"
        disabled={!aggregatorData}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default SubmitButton;
