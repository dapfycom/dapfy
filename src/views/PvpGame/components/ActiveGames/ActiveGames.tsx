import { useGetActiveGames } from "../../utils/hooks";
import Game from "./components/Game";
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
          return <Game key={game.game?.id || index} game={game} />;
        })}
      </div>
    </div>
  );
};

export default ActiveGames;
