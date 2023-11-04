import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { openLogin } from "@/redux/dapp/dapp-slice";
import { lpSwap } from "@/views/SwapView/lib/calls";
import { useSwapLpRate } from "@/views/SwapView/lib/hooks";
import {
  selectFromField,
  selectSlippage,
} from "@/views/SwapView/lib/swapLp-slice";

import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import React from "react";

const Realistic = React.lazy(() => import("@/components/Conffeti/Realistic"));

const SubmitButton = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useGetLoginInfo();
  const fromField = useAppSelector(selectFromField);
  // const toField = useAppSelector(selectToField);
  const slippage = useAppSelector(selectSlippage);
  const { data: swapRoutes } = useSwapLpRate();
  const [sessionId, setSessionId] = React.useState<string>("");
  const [txSuccess, setTxSuccess] = React.useState(false);

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
      console.log("transactionId", transactionId);
      console.log("errorMessage", errorMessage);
    },
  });

  const handleSwap = async () => {
    if (!isLoggedIn) {
      dispatch(openLogin(true));
    } else {
      setTxSuccess(false);

      const res = await lpSwap(swapRoutes, fromField, slippage);
      if (res?.sessionId) {
        setSessionId(res.sessionId);
      }
    }
  };

  let buttonText = isLoggedIn
    ? fromField.value !== ""
      ? "confirm"
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
