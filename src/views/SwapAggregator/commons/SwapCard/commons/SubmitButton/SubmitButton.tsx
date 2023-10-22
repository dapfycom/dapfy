import { Button } from "@/components/ui/button";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { openLogin } from "@/redux/dapp/dapp-slice";
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

      if (aggregatorData) {
        setTxSuccess(false);
        const res = await submitSwap(
          fromField.selectedToken,
          aggregatorData?.swapAmountWithDecimal,
          aggregatorData?.swaps
        );

        setSessionId(res?.sessionId);
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
      <Button onClick={handleSwap} className="w-full">
        {buttonText}
      </Button>
    </>
  );
};

export default SubmitButton;
