import { Skeleton } from "@/components/ui/skeleton";
import {
  formatBalance,
  setElrondBalance,
} from "@/utils/functions/formatBalance";
import { useGetAccount } from "@multiversx/sdk-dapp/hooks";
import { useFilterGames } from "../../utils/hooks";
import Game from "./components/Game";

import { Button } from "@/components/ui/button";
import useDisclosure from "@/hooks/useDisclosure";
import useGetXMinimalInfo from "@/hooks/useGetXMinimalInfo";
import { IGameWithUserInfo } from "@/views/PvpGame/utils/interface";
import { joinGame } from "@/views/PvpGame/utils/services";
import { Address } from "@multiversx/sdk-core/out";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import PendingModal from "./components/PendingModal";
const ResultModal = dynamic(() => import("./components/ResultModal"));

const ActiveGames = () => {
  const { games, handleFilter, filterOptions, isLoading, clearFilter } =
    useFilterGames();
  const { balance } = useGetAccount();

  const [sessionId, setSessionId] = useState<string | null>("");
  const { user } = useGetXMinimalInfo();
  const [txData, setTxData] = useState("");
  const { isOpen, onOpen, onClose, setOpen } = useDisclosure();

  const handleJoinGame = async (game: IGameWithUserInfo) => {
    const res = await joinGame(
      game.game?.id!,
      game.game?.amount!,
      user?.username,
      user?.profile_image_url,
      game.game?.user_creator || Address.Zero().bech32(),
      game.user_creator?.username || "",
      game.user_creator?.profile_url || ""
    );

    setSessionId(res?.sessionId);
    onOpen();
  };

  const onSuccess = () => {
    if (transactions) {
      setTxData(transactions.length > 0 ? transactions[0]?.hash || "" : "");
    }

    mutate("pvpWsp:getActiveGames");
    mutate("pvpWsp:getStats");
    mutate("pvpWsp:getGamesHistory");
  };

  const { transactions, isPending } = useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess,
  });

  useEffect(() => {
    setOpen(Boolean(isPending));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);
  const handleClose = () => {
    setTxData("");
    onClose();
  };

  const txSuccess = Boolean(txData);

  const isOpenPendingModal = isPending && isOpen;
  return (
    <div>
      {txSuccess && (
        <ResultModal isOpen={txSuccess} onClose={handleClose} txHash={txData} />
      )}

      {isOpenPendingModal && (
        <PendingModal isOpen={isOpenPendingModal} onClose={onClose} />
      )}
      <div className="flex justify-center items-end w-full mb-4">
        <div>
          Balance :{" "}
          <span className="text-green-500">
            {formatBalance({
              balance: balance,
            })}{" "}
            EGLD
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="gap-8 flex flex-col">
          <Skeleton className="min-h-[94px]" />
          <Skeleton className="min-h-[94px]" />

          <Skeleton className="min-h-[94px]" />
          <Skeleton className="min-h-[94px]" />
          <Skeleton className="min-h-[94px]" />
        </div>
      ) : (
        <>
          <div className="flex w-full justify-between">
            <div className="mb-3 flex gap-4">
              <Button
                variant={
                  filterOptions?.name === "bigger" ? "secondary" : "outline"
                }
                onClick={() =>
                  handleFilter("bigger", setElrondBalance(1), "EGLD")
                }
              >
                {"> 1 EGLD"}
              </Button>
              <Button
                variant={
                  filterOptions?.name === "smaller" ? "secondary" : "outline"
                }
                onClick={() =>
                  handleFilter("smaller", setElrondBalance(1), "EGLD")
                }
              >
                {"< 1 EGLD"}
              </Button>
            </div>

            <Button variant={"destructive"} onClick={clearFilter}>
              Clear
            </Button>
          </div>
          {games.length > 0 && !isLoading ? (
            <div className="space-y-4">
              {games.map((game, index) => {
                if (!game.game) {
                  return null;
                }
                return (
                  <Game
                    key={game.game?.id || index}
                    game={game}
                    handleJoinGame={() => handleJoinGame(game)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full border rounded min-h-[300px] flex justify-center items-center">
              <p>No games found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ActiveGames;
