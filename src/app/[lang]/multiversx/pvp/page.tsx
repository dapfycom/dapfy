"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatAddress } from "@/utils/functions/formatAddress";
import { useGetActiveGames } from "@/views/PvpGame/utils/hooks";
import { createGame } from "@/views/PvpGame/utils/services";

export default function PvPPage() {
  const { games } = useGetActiveGames();

  console.log({ games });

  return (
    <div className="h-screen  p-8 flex flex-col items-center">
      <div className="p-4 rounded-lg mb-4 text-center">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold">Total Games Played</p>
            <p className="text-lg font-semibold">245</p>
          </div>
          <div>
            <p className="text-2xl font-bold">Total Volume</p>
            <p className="text-lg font-semibold">120 EGLD</p>
          </div>
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-6">Game Lobby</h1>
      <Button className="mb-6 " onClick={() => createGame()}>
        Create a new game
      </Button>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Active Game Sessions</h2>
          <div className="space-y-4">
            {games.map((game, index) => {
              return (
                <div
                  key={game.game?.id || index}
                  className="flex items-center justify-between p-4 border rounded-lg"
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
                  <Button className=" ">Join</Button>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Games</h2>
          <div className="space-y-4">
            {games.map((game, index) => {
              return (
                <div
                  key={game.game?.id || index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-lg font-semibold">
                        {game.user_creator?.username || game.game?.user_creator}
                      </p>
                      <p className="text-sm text-[#888eb0]">
                        Game ID: {game.game?.id}
                      </p>
                    </div>
                    <Button variant={"secondary"}>Cancel</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
