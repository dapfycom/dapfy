import Realistic from "@/components/Conffeti/Realistic";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import useGetTransactionByHash from "@/hooks/useGetTransactionByHash";
import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { formatBalance } from "@/utils/functions/formatBalance";
import queryString from "query-string";
import { memo, useEffect, useState } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  txHash: string;
}

const ResultModal = ({ isOpen, onClose, txHash }: IProps) => {
  const { transaction, isLoading } = useGetTransactionByHash(txHash);

  const [isReady, setIsReady] = useState(false);
  const [winnerInfo, setWinnerInfo] = useState<{
    winner: string;
    amount: string;
    amountLoose: string;
    tokenIdentifier: string | null;
  }>({
    winner: "",
    amount: "0",
    amountLoose: "0",
    tokenIdentifier: null,
  });
  const userAddress = useAppSelector(selectUserAddress);

  const { elrondToken } = useGetElrondToken(winnerInfo.tokenIdentifier);

  useEffect(() => {
    if (transaction?.status !== "pending") {
      const results = transaction?.results || [];
      if (results.length > 0) {
        const winnerAddress = results[results.length - 1].receiver;
        setWinnerInfo({
          winner: winnerAddress,
          amount: results[results.length - 1].value,
          tokenIdentifier: "EGLD",
          amountLoose: transaction?.value || "0",
        });

        setIsReady(true);
      }
    }
  }, [transaction?.results, transaction?.status, transaction?.value]);

  const handleClose = () => {
    setIsReady(false);
    onClose();
  };

  const userWin = winnerInfo.winner === userAddress;

  return (
    <>
      {transaction && isReady && userWin && <Realistic />}

      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Battle Reveal</DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="flex justify-center items-center h-[200px]">
              <div className="rounded-full h-16 w-16 bg-orange-500 animate-ping"></div>
            </div>
          ) : (
            transaction &&
            isReady && (
              <div className="flex flex-col items-center justify-center w-full mt-4">
                <div className="text-lg font-semibold mb-8 text-primary">
                  After the battle...
                </div>

                <hr className="border-gray-300 w-full" />

                {userWin ? (
                  <div className="my-8 text-center">
                    <div className="text-2xl font-bold  text-green-500">
                      You Win!
                    </div>
                    <div className="font-bold text-lg">
                      {formatBalance({
                        balance: winnerInfo.amount,
                        decimals: elrondToken.decimals,
                      })}{" "}
                      {winnerInfo.tokenIdentifier}
                    </div>

                    <Button className="mt-8">
                      <a
                        href={queryString.stringifyUrl({
                          url: "https://twitter.com/intent/post",
                          query: {
                            text: `I just won ${formatBalance({
                              balance: winnerInfo.amount,
                              decimals: elrondToken.decimals,
                            })} 💸 🎉  Play the PvP game on dapfy.com and you can win too!`,
                            original_referer: "https://www.dapfy.com/",
                            related: "dapfy",
                          },
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Share on X
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className="my-8">
                    <div className="text-2xl font-bold  text-red-500">
                      You Loose!
                    </div>
                    <div className="font-bold text-lg">
                      {formatBalance({
                        balance: winnerInfo.amountLoose,
                        decimals: elrondToken.decimals,
                      })}{" "}
                      {winnerInfo.tokenIdentifier}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(ResultModal);
