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
    console.log("fromField", fromField);

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
      <Button onClick={handleSwap} className="w-full max-w-[200px]">
        {buttonText}
      </Button>

      {/* <ActionButton
        width={"full"}
        h="auto"
        py={"20px"}
        bgColor="rgba(40, 67, 190, 0.3)"
        _disabled={{
          "& p": {
            color: "dark.100 !important",
          },
          bg: "dark.400",
        }}
        onClick={handleSwap}
      >
        <Text color="primary" opacity={1} fontSize={{ xs: "md", lg: "25px" }}>
          {buttonText}
        </Text>
      </ActionButton> */}
    </>
  );
};

export default SubmitButton;
