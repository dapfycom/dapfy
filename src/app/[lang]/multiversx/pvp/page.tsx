"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatAddress } from "@/utils/functions/formatAddress";
import { getRealBalance } from "@/utils/functions/formatBalance";
import {
  useGetActiveGames,
  useGetUserActiveGames,
} from "@/views/PvpGame/utils/hooks";
import {
  cancelGame,
  createGame,
  joinGame,
} from "@/views/PvpGame/utils/services";
import { useFormik } from "formik";
import * as yup from "yup";

export default function PvPPage() {
  const { games } = useGetActiveGames();
  const { games: userGames } = useGetUserActiveGames();

  console.log({ games });
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: (values) => {
      createGame(Number(values.amount), "firulaus", "EGLD", 18);
    },

    validationSchema: yup.object().shape({
      amount: yup.number().required("Required"),
    }),
  });

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
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-6 ">Create a new game</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={formik.handleSubmit}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  className="col-span-3"
                  name="amount"
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <Button type="submit">Send</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Active Game Sessions</h2>
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
                      <p className="text-lg font-semibold">
                        {game.user_creator?.username || game.game?.user_creator}
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
      </div>
    </div>
  );
}
