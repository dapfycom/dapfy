import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { formatAddress } from "@/utils/functions/formatAddress";
import { getRealBalance } from "@/utils/functions/formatBalance";
import { copyTextToClipboard } from "@/utils/functions/general";
import { IGameWithUserInfo } from "@/views/PvpGame/utils/interface";
interface IProps {
  game: IGameWithUserInfo;
  handleJoinGame: () => void;
}

const Game = ({ game, handleJoinGame }: IProps) => {
  const address = useAppSelector(selectUserAddress);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg gap-5">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              alt="User Avatar"
              src={game.user_creator?.profile_url || "/placeholder-avatar.jpg"}
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-[#888eb0]">Game ID: {game.game?.id}</p>
            <p
              className="text-sm font-semibold cursor-pointer"
              onClick={() =>
                copyTextToClipboard(
                  game.user_creator?.username || game.game?.user_creator || " "
                )
              }
            >
              {game.user_creator?.username ||
                formatAddress(game.game?.user_creator || "")}
            </p>

            <p className="text-muted-foreground text-sm">
              {new Date((game.game?.date || 0) * 1000).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Button
          onClick={handleJoinGame}
          disabled={address === game.game?.user_creator}
        >
          ⚔️ Battle for {getRealBalance(game.game?.amount).toString()}{" "}
          {game.game?.token_identifier}
        </Button>
      </div>
    </>
  );
};

export default Game;
