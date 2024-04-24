"use client";
import RequiredLoginButton from "@/components/RequiredLoginButton/RequiredLoginButton";
import { Button } from "@/components/ui/button";
import { selectedNetwork } from "@/config/network";
import useAuthentication from "@/hooks/useAuthentication";
import useGetAccountToken from "@/hooks/useGetAccountToken";
import { formatNumber } from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import BigNumber from "bignumber.js";
import { Loader, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { mintJeeter } from "../../utils/calls.services";
import { minAmountJeetToMint } from "../../utils/constants";
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
  const { data: remainingToMint, isLoading: isLoadingLeftToMint } =
    useGetLeftToMint();

  const { mutate: mutateLeftToMint } = useGetLeftToMint();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { mutate: mutateUserMinted } = useGetUserMinted();
  const { tokenLogin } = useAuthentication();

  const { accountToken, isLoading: isLoading2 } = useGetAccountToken(
    selectedNetwork.tokensID.jeet
  );

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

  const canMint = new BigNumber(
    accountToken?.balance || 0
  ).isGreaterThanOrEqualTo(minAmountJeetToMint);

  return (
    <div className="flex flex-col items-center gap-4 justify-center">
      {isLoading || isLoading2 ? (
        <div className="text-xl">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <div>
          {remainingToMint === 0 ? (
            <div className="text-red-500 text-3xl"> SOLD OUT</div>
          ) : (
            <div>
              <div className="text-center text-orange-400 mb-3">
                {" "}
                {formatNumber(
                  new BigNumber(data.amount).dividedBy(10 ** 18).toString()
                )}{" "}
                ${formatTokenI(data.token_identifier)} per NFT
              </div>
              {canMint ? (
                <div className="flex gap-4 flex-col items-center">
                  <div className="flex gap-3 items-center">
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      onClick={() =>
                        setAmount((prev) => (prev <= 0 ? 0 : prev - 1))
                      }
                    >
                      <Minus />
                    </Button>

                    <div className="text-xl">{amount}</div>

                    <Button
                      size={"icon"}
                      variant={"outline"}
                      onClick={() =>
                        setAmount((prev) => (prev >= max ? max : prev + 1))
                      }
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
                  <RequiredLoginButton
                    className="w-full sm:w-auto"
                    disabled={amount === 0 || isLoading}
                    onClick={handleMint}
                  >
                    Purchase digital collectible
                  </RequiredLoginButton>
                </div>
              ) : (
                <div className="flex flex-col gap-4 items-center">
                  <div className="text-center">
                    Mint open only for those that have at least 1 million JEET.
                  </div>
                  <Button variant={"secondary"} className="px-6" asChild>
                    <a
                      href={`https://xexchange.com/swap?firstToken=EGLD&secondToken=${selectedNetwork.tokensID.jeet}&accessToken=${tokenLogin?.nativeAuthToken}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buy Jeet
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MintButton;
