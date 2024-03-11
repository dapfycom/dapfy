import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatAddress } from "@/utils/functions/formatAddress";
import { getRealBalance } from "@/utils/functions/formatBalance";
import { joinGame } from "@/views/PvpGame/utils/services";
import { useGetActiveGames } from "../../utils/hooks";
const ActiveGames = () => {
  const { games } = useGetActiveGames();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Active Game</h2>
      <div className="space-y-4">
        {games.map((game, index) => {
          if (!game.game) {
            return null;
          }
          return (
            <div
              key={game.game?.id || index}
              className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg gap-5"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    alt="User Avatar"
                    src="/placeholder-avatar.jpg"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-[#888eb0]">
                    Game ID: {game.game?.id}
                  </p>
                  <p className="text-lg font-semibold">
                    {game.user_creator?.username ||
                      formatAddress(game.game?.user_creator || "")}
                  </p>
                </div>
              </div>
              <Button
                className=" "
                onClick={() => joinGame(game.game?.id!, game.game?.amount!)}
              >
                Join with {getRealBalance(game.game.amount).toString()}{" "}
                {game.game.token_identifier}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveGames;
