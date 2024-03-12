import { formatBalance } from "@/utils/functions/formatBalance";
import { useGetAccount } from "@multiversx/sdk-dapp/hooks";
import { useGetActiveGames } from "../../utils/hooks";
import Game from "./components/Game";
const ActiveGames = () => {
  const { games, isLoading } = useGetActiveGames();
  const { balance } = useGetAccount();
  return (
    <div>
      <div className="flex justify-end items-end w-full mb-4">
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

      {games.length > 0 && !isLoading ? (
        <div className="space-y-4">
          {games.map((game, index) => {
            if (!game.game) {
              return null;
            }
            return <Game key={game.game?.id || index} game={game} />;
          })}
        </div>
      ) : (
        <div className="w-full border rounded min-h-[300px] flex justify-center items-center">
          <p>No games found</p>
        </div>
      )}
    </div>
  );
};

export default ActiveGames;
