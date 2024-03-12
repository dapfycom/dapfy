"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDisclosure from "@/hooks/useDisclosure";
import useGetAccountToken from "@/hooks/useGetAccountToken";
import useGetXMinimalInfo from "@/hooks/useGetXMinimalInfo";
import { formatBalance } from "@/utils/functions/formatBalance";
import { createGame } from "@/views/PvpGame/utils/services";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import { useFormik } from "formik";
import React from "react";
import { mutate } from "swr";
import * as yup from "yup";

const CreateGame = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user } = useGetXMinimalInfo();
  const [sessionId, setSessionId] = React.useState<string | null>("");
  const { accountToken } = useGetAccountToken("EGLD");
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: async (values) => {
      const res = await createGame(
        Number(values.amount),
        user?.username,
        user?.profile_image_url
      );

      setSessionId(res?.sessionId);

      onClose();
    },

    validationSchema: yup.object().shape({
      amount: yup.number().required("Required"),
    }),
  });

  const onSuccess = React.useCallback(() => {
    mutate("pvpWsp:getActiveGames");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess,

    onFail: (transactionId: string | null, errorMessage?: string) => {
      console.error("transactionId", transactionId);
      console.error("errorMessage", errorMessage);
    },
  });

  return (
    <>
      <Button className="mb-6" onClick={onOpen}>
        Create a new game
      </Button>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          open ? onOpen() : onClose();
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={formik.handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create Game</DialogTitle>
              <DialogDescription>
                Play with others users and earn EGLD
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex flex-col  gap-2">
                <div className="flex w-full justify-between">
                  <Label htmlFor="amount">Amount</Label>
                  <div>{formatBalance(accountToken)} EGLD</div>
                </div>
                <Input
                  id="amount"
                  className="col-span-3"
                  name="amount"
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Start Battle
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateGame;
