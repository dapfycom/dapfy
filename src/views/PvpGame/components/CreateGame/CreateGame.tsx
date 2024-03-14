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
import useGetElrondToken from "@/hooks/useGetElrondToken";
import useGetXMinimalInfo from "@/hooks/useGetXMinimalInfo";
import { formatBalance, getRealBalance } from "@/utils/functions/formatBalance";
import { createGame } from "@/views/PvpGame/utils/services";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import { useFormik } from "formik";
import React, { MouseEvent } from "react";
import { mutate } from "swr";
import * as yup from "yup";
import { useGetMinimalAmount } from "../../utils/hooks";

const CreateGame = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user } = useGetXMinimalInfo();
  const [sessionId, setSessionId] = React.useState<string | null>("");
  const { accountToken } = useGetAccountToken("EGLD");
  const { minAmount } = useGetMinimalAmount("EGLD");
  const { elrondToken } = useGetElrondToken(
    minAmount?.token_identifier || null
  );
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
      amount: yup
        .number()
        .required("Required")
        .min(
          getRealBalance(
            minAmount?.amount || 0,
            elrondToken?.decimals || 0,
            true
          ) as number,
          `Amount must be greater than or equal to "${getRealBalance(
            minAmount?.amount || 0,
            elrondToken?.decimals || 0,
            true
          )} ${minAmount?.token_identifier}"`
        ),
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
  const handleSetAmount = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    value: string
  ) => {
    e.preventDefault();
    formik.setFieldValue("amount", value);
  };
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
        <DialogContent className="sm:max-w-[425px] top-[30%] sm:top-[50%]">
          <form onSubmit={formik.handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create Game</DialogTitle>
              <DialogDescription>
                Play with others users and earn EGLD
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 mt-4">
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
                  value={formik.values.amount}
                />
              </div>
            </div>

            <p className="text-red-500 text-sm mt-2">{formik.errors.amount}</p>
            <div className="flex gap-3 justify-center mt-4">
              <Button
                variant={"secondary"}
                className="w-[60px]"
                onClick={(e) => handleSetAmount(e, "0.01")}
              >
                0.01
              </Button>
              <Button
                variant={"secondary"}
                className="w-[60px]"
                onClick={(e) => handleSetAmount(e, "0.1")}
              >
                0.1
              </Button>

              <Button
                variant={"secondary"}
                className="w-[60px]"
                onClick={(e) => handleSetAmount(e, "0.5")}
              >
                0.5
              </Button>
              <Button
                variant={"secondary"}
                className="w-[60px]"
                onClick={(e) => handleSetAmount(e, "1")}
              >
                1
              </Button>
            </div>

            <Button type="submit" className="w-full mt-4">
              Start Battle
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateGame;
