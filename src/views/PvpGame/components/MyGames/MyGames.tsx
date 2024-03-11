"use client";
import { Button } from "@/components/ui/button";
import { formatAddress } from "@/utils/functions/formatAddress";
import { copyTextToClipboard } from "@/utils/functions/general";
import { useGetUserActiveGames } from "@/views/PvpGame/utils/hooks";
import { cancelGame } from "@/views/PvpGame/utils/services";
const MyGames = () => {
  const { games: userGames } = useGetUserActiveGames();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Games</h2>
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
    </div>
  );
};

export default MyGames;
