import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import Realistic from "components/Conffeti/Realistic";
import { selectedNetwork } from "config/network";
import useGetUserTokens from "hooks/useGetUserTokens";
import { useAppSelector } from "hooks/useRedux";
import { useState } from "react";
import {
  selectConvertInfo,
  selectToTokenDust,
} from "views/DustView/lib/dust-slice";
import { useGetAmountOut } from "views/DustView/lib/hooks";
import { converTokens } from "views/DustView/lib/services";

const ConvertButton = () => {
  const selectedTokens = useAppSelector(selectConvertInfo);
  const toToken = useAppSelector(selectToTokenDust);
  const { data } = useGetAmountOut(selectedTokens);
  const [sessionId, setSessionId] = useState("");
  const [conffeti, setconffeti] = useState(false);

  const { mutate } = useGetUserTokens();

  const onSuccess = () => {
    mutate();
    if (toToken === selectedNetwork.tokensID.bsk) {
      setconffeti(true);
    }
  };
  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess,
  });
  const handleSubmit = async () => {
    const slippage = 1;

    const bnAmountOut = new BigNumber(data.amountOut);
    const amountWithSlipage = new BigNumber(bnAmountOut).minus(
      new BigNumber(slippage / 100).multipliedBy(bnAmountOut)
    );
    const res = await converTokens(
      data.tokenIdentifier,
      amountWithSlipage.toFixed(0),
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
      {conffeti && <Realistic />}

      <ActionButton
        onClick={handleSubmit}
        mt={16}
        // disabled={swapInfo.length === 0}
        fontWeight="600"
      >
        Convert tokens
      </ActionButton>
    </>
  );
};

export default ConvertButton;
