"use client";
import RequiredLoginButton from "@/components/RequiredLoginButton/RequiredLoginButton";
import { Button } from "@/components/ui/button";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import BigNumber from "bignumber.js";
import { Loader, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { mintJeeter } from "../../utils/calls.services";
import {
  useGetLeftToMint,
  useGetMaxUserAllowedToBuy,
  useGetNFTsPrice,
  useGetUserMinted,
} from "../../utils/hooks";

const MintButton = () => {
  const [amount, setAmount] = useState(1);
  const { data } = useGetNFTsPrice();
  const { tokensLeftToMint: max, isLoading } = useGetMaxUserAllowedToBuy();
  const { mutate: mutateLeftToMint } = useGetLeftToMint();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { mutate: mutateUserMinted } = useGetUserMinted();
  const handleMint = async () => {
    if (!data) return;

    const res = await mintJeeter(
      {
        amount: new BigNumber(data.amount).multipliedBy(amount).toString(),
        token_identifier: data.token_identifier,
        token_nonce: data.token_nonce,
      },
      amount
    );
    setSessionId(res.sessionId);
  };
  const onSuccess = () => {
    mutateUserMinted();
    mutateLeftToMint();
  };

  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess,
  });

  return (
    <div className="flex flex-col items-center gap-4 justify-center">
      {isLoading ? (
        <div className="text-xl">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => setAmount((prev) => (prev <= 0 ? 0 : prev - 1))}
          >
            <Minus />
          </Button>

          <div className="text-xl">{amount}</div>

          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => setAmount((prev) => (prev >= max ? max : prev + 1))}
          >
            <Plus />
          </Button>

          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => setAmount(max)}
          >
            <span className="text-xs">MAX</span>
          </Button>
        </div>
      )}

      <RequiredLoginButton
        className="w-full sm:w-auto"
        disabled={amount === 0 || isLoading}
        onClick={handleMint}
      >
        Purchase digital collectible
      </RequiredLoginButton>
    </div>
  );
};

export default MintButton;
