import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useGetXMinimalInfo from "@/hooks/useGetXMinimalInfo";
import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { formatAddress } from "@/utils/functions/formatAddress";
import { getRealBalance } from "@/utils/functions/formatBalance";
import { copyTextToClipboard } from "@/utils/functions/general";
import { IGameWithUserInfo } from "@/views/PvpGame/utils/interface";
import { joinGame } from "@/views/PvpGame/utils/services";
import { Address } from "@multiversx/sdk-core/out";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import { useCallback, useState } from "react";
import { mutate } from "swr";

interface IProps {
  game: IGameWithUserInfo;
}

const Game = ({ game }: IProps) => {
  const address = useAppSelector(selectUserAddress);
  const [sessionId, setSessionId] = useState<string | null>("");
  const { user } = useGetXMinimalInfo();

  const handleJoinGame = async () => {
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
  };

  const onSuccess = useCallback(() => {
    mutate("pvpWsp:getActiveGames");
    mutate("pvpWsp:getStats");
  }, []);

  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess,
  });

  return (
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
        ⚔️ {getRealBalance(game.game?.amount).toString()}{" "}
        {game.game?.token_identifier}
      </Button>
    </div>
  );
};

export default Game;
