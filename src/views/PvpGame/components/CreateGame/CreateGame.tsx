"use client";
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
import {
  useGetActiveGames,
  useGetUserActiveGames,
} from "@/views/PvpGame/utils/hooks";
import { createGame } from "@/views/PvpGame/utils/services";
import { useFormik } from "formik";
import * as yup from "yup";

const CreateGame = () => {
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
  );
};

export default CreateGame;
