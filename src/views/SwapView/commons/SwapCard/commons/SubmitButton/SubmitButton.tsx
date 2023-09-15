import { Button } from "@/components/ui/button";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { openLogin } from "@/redux/dapp/dapp-slice";
import { useGetSwapRate } from "@/views/SwapView/lib/hooks";
import {
  selectFromField,
  selectSlippage,
} from "@/views/SwapView/lib/swap-slice";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import React, { useState } from "react";

const Realistic = React.lazy(() => import("@/components/Conffeti/Realistic"));

const SubmitButton = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useGetLoginInfo();
  const fromField = useAppSelector(selectFromField);
  const slippage = useAppSelector(selectSlippage);
  const { data: swapRoutes } = useGetSwapRate();
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
      setTxSuccess(false);
      import("@/views/SwapView/lib/calls").then(async (calls) => {
        const res = await calls.submitSwap(
          swapRoutes || [],
          slippage,
          {
            token: fromField.selectedToken,
            value: Number(fromField.value),
          },

          fromElrondToken
        );

        setSessionId(res?.sessionId);
      });
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
