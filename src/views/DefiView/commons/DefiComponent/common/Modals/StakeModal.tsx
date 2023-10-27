import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useGetAccountToken from "@/hooks/useGetAccountToken";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import { formatBalance, getRealBalance } from "@/utils/functions/formatBalance";
import { deposit } from "@/views/DefiView/utils/services";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import { useFormik } from "formik";
import Image from "next/image";
import { useContext, useState } from "react";
import * as yup from "yup";
import { FarmContext } from "../../DefiComponent";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const StakeModal = ({ isOpen, onClose }: IProps) => {
  const { hatomFarm } = useContext(FarmContext);
  const [sessionId, setSessionId] = useState<string | null>("");

  const { elrondToken: stakedToken } = useGetElrondToken(
    hatomFarm?.moneyMarket.tokenI || null
  );
  const { accountToken: userStakedToken } = useGetAccountToken(
    hatomFarm?.moneyMarket.tokenI || ""
  );
  const stakeSchema = yup.object({
    amount: yup.number(),
  });

  const onSuccess = () => {
    onClose();
  };

  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess,
    onFail: (transactionId: string | null, errorMessage?: string) => {
      console.error("transactionId", transactionId);
      console.error("errorMessage", errorMessage);
    },
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: async (values) => {
      let amount = values.amount;
      if (hatomFarm) {
        const res = await deposit(
          amount,
          stakedToken,
          hatomFarm?.moneyMarket.childScAddress
        );
        setSessionId(res?.sessionId);
      }
    },
    validationSchema: stakeSchema,
  });
  const handleMax = () => {
    const value = getRealBalance(
      userStakedToken.balance,
      userStakedToken.decimals,
      true
    );
    formik.setFieldValue("amount", value.toString());
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {" "}
            <div className="flex items-center gap-3">
              <div className="w-[35px] h-[35px]">
                <Image
                  src={"/images/hatom.png"}
                  alt="hatom"
                  width={35}
                  height={35}
                />{" "}
              </div>
              <h3>Stake {stakedToken?.ticker} on hatom protocol</h3>
            </div>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-2">
            {/* <Label htmlFor="amount-bskegld">BSK-EGLD Amount</Label> */}
            <Input
              id="amount-bskegld"
              name="amount"
              placeholder="Amount"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.amount}
              isInvalid={
                Boolean(formik.touched.amount) && Boolean(formik.errors.amount)
              }
            />
            <div className="flex justify-between mt-3 text-xs mb-2">
              <p className="text-red-700">{formik.errors.amount}</p>
              <p className="cursor-pointer" onClick={handleMax}>
                Balance: {formatBalance(userStakedToken)} {stakedToken?.ticker}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Stake</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StakeModal;
