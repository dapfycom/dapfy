import Realistic from "@/components/Conffeti/Realistic";
import { PointerIcon } from "@/components/ui-system/icons/ui-icons";
import { Button } from "@/components/ui/button";
import useGetUserTokens from "@/hooks/useGetUserTokens";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useTxNotification from "@/hooks/useTxNotification";
import {
  selectConvertInfo,
  selectOutputToken,
  selectToTokenDust,
} from "@/views/DustView/lib/dust-slice";
import {
  useGetAmountOut,
  useSelectableDustTokens,
} from "@/views/DustView/lib/hooks";
import { convertTokens } from "@/views/DustView/lib/services";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import BigNumber from "bignumber.js";
import { useState } from "react";

const ConvertButton = () => {
  const { finalTokens } = useSelectableDustTokens();
  const dispatch = useAppDispatch();

  const selectedTokens = useAppSelector(selectConvertInfo);
  const toToken = useAppSelector(selectToTokenDust);
  const { data } = useGetAmountOut(selectedTokens);
  const [sessionId, setSessionId] = useState("");
  const [confetti, setConfetti] = useState(false);
  const { delayedToastTxNotification } = useTxNotification();
  const { mutate } = useGetUserTokens();

  const onSuccess = () => {
    mutate();
    dispatch(
      selectOutputToken({
        data: finalTokens,
        isCheked: false,
      })
    );

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
      data?.tokenIdentifier || toToken,
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
      <Button
        className="w-full bg-[#ff9900] hover:text-[#ff9900] text-white gap-3"
        onClick={handleSubmit}
      >
        <PointerIcon className="h-6 w-6" />
        Convert dust now with 1-Click®
      </Button>
    </>
  );
};

export default ConvertButton;
