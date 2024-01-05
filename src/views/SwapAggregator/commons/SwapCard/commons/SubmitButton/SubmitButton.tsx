import { PointerIcon } from "@/components/ui-system/icons/ui-icons";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useTxNotification from "@/hooks/useTxNotification";
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
  const { delayedToastTxNotification, toastTxNotification } =
    useTxNotification();

  const onSuccess = React.useCallback(() => {
    setTxSuccess(true);
    delayedToastTxNotification(2000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (aggregatorData && aggregatorData?.returnAmountWithDecimal) {
        const res = await submitSwap(aggregatorData, slippage);

        setSessionId(res?.sessionId);
      } else {
        throw new Error("No return amount with decimals");
      }
    }
  };

  let buttonText = isLoggedIn ? (
    fromField.value !== "" ? (
      <>
        {" "}
        <PointerIcon className="h-6 w-6" /> Swap now with 1-Click®
      </>
    ) : (
      "Enter an amount"
    )
  ) : (
    "Connect wallet"
  );

  return (
    <>
      {txSuccess && <Realistic />}
      <Button
        onClick={handleSwap}
        className="w-full  bg-[#ff9900] hover:text-[#ff9900] text-white gap-3"
        disabled={!aggregatorData && isLoggedIn}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default SubmitButton;
