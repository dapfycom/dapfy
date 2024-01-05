import Realistic from "@/components/Conffeti/Realistic";
import { Button } from "@/components/ui/button";
import useGetUserTokens from "@/hooks/useGetUserTokens";
import { useAppSelector } from "@/hooks/useRedux";
import useTxNotification from "@/hooks/useTxNotification";
import {
  selectConvertInfo,
  selectToTokenDust,
} from "@/views/DustView/lib/dust-slice";
import { useGetAmountOut } from "@/views/DustView/lib/hooks";
import { convertTokens } from "@/views/DustView/lib/services";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import BigNumber from "bignumber.js";
import { useState } from "react";

const ConvertButton = () => {
  const selectedTokens = useAppSelector(selectConvertInfo);
  const toToken = useAppSelector(selectToTokenDust);
  const { data } = useGetAmountOut(selectedTokens);
  const [sessionId, setSessionId] = useState("");
  const [confetti, setConfetti] = useState(false);
  const { delayedToastTxNotification } = useTxNotification();
  const { mutate } = useGetUserTokens();

  const onSuccess = () => {
    mutate();
    setConfetti(true);

    delayedToastTxNotification();
  };
  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess,
  });
  const handleSubmit = async () => {
    setConfetti(false);
    const slippage = 1;

    const bnAmountOut = new BigNumber(data?.amountOut || 0);
    const amountWithSlippage = new BigNumber(bnAmountOut).minus(
      new BigNumber(slippage / 100).multipliedBy(bnAmountOut)
    );
    const res = await convertTokens(
      data?.tokenIdentifier || "",
      amountWithSlippage.toFixed(0),
      selectedTokens.map((token) => {
        return {
          collection: token.identifier,
          nonce: 0,
          value: token.balance,
        };
      })
    );
    if (res) {
      setSessionId(res?.sessionId || "");
    }
  };

  return (
    <>
      {confetti && <Realistic />}
      <Button className="w-full" onClick={handleSubmit}>
        Convert dust now with one-click
      </Button>
    </>
  );
};

export default ConvertButton;
