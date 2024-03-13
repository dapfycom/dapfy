"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatAddress } from "@/utils/functions/formatAddress";
import { formatBalance } from "@/utils/functions/formatBalance";
import { copyTextToClipboard } from "@/utils/functions/general";
import { useGetUserActiveGames } from "@/views/PvpGame/utils/hooks";
import { cancelGame } from "@/views/PvpGame/utils/services";
const MyGames = () => {
  const { games: userGames, isLoading } = useGetUserActiveGames();

  return (
    <div className="">
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
          {userGames.length > 0 && !isLoading ? (
            <div className="space-y-4">
              {userGames.map((game, index) => {
                if (!game?.game) return null;
                return (
                  <div
                    key={game.game.id || index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <p
                          className="text-lg font-semibold cursor-pointer"
                          onClick={() =>
                            copyTextToClipboard(
                              game.user_creator?.username ||
                                game.game?.user_creator ||
                                " "
                            )
                          }
                        >
                          {game.user_creator?.username ||
                            formatAddress(game.game?.user_creator)}
                        </p>
                        <p className="text-sm text-[#888eb0]">
                          Game ID: {game.game?.id}
                        </p>

                        <p>
                          {formatBalance({
                            balance: game.game.amount,
                            decimals: 18,
                          })}{" "}
                          {game.game.token_identifier}
                        </p>
                      </div>
                      <Button
                        variant={"secondary"}
                        onClick={() => cancelGame(game.game?.id || 0)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full border rounded min-h-[300px] flex justify-center items-center">
              <p>No games found</p>
            </div>
          )}{" "}
        </>
      )}
    </div>
  );
};

export default MyGames;
