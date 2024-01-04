import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectedNetwork } from "@/config/network";
import useGetAccountToken from "@/hooks/useGetAccountToken";
import { getRealBalance } from "@/utils/functions/formatBalance";
import { stake } from "@/views/FarmView/commons/FarmOneDex/utils/services";
import { useFormik } from "formik";
import { useContext } from "react";
import * as yup from "yup";
import { OneDexFarmContext } from "../../FarmOneDex";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const StakeModal = ({ isOpen, onClose }: IProps) => {
  const { farm } = useContext(OneDexFarmContext);
  const { accountToken: userStakedToken } = useGetAccountToken(
    selectedNetwork.tokensID.egld
  );

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: (values) => {
      let amount = values.amount;
      if (farm?.farm_click_id) {
        stake(amount, farm.farm_click_id);
      }
    },
    validationSchema: yup.object().shape({
      amount: yup
        .number()
        .required("Amount is required")
        .min(1, "Amount must be greater than 1 EGLD")
        .max(
          getRealBalance(
            userStakedToken.balance,
            userStakedToken.decimals,
            true
          ) as number,
          "Amount must be less than balance"
        ),
    }),
  });
  const handleMax = () => {
    const value = getRealBalance(
      userStakedToken.balance,
      userStakedToken.decimals,
      true
    );
    formik.setFieldValue("amount", value.toString());
  };
  if (!farm) return null;
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[24rem]">
        <DialogHeader>
          <DialogTitle>
            {" "}
            <h3 className="text-lg font-semibold mb-4">
              Auto-Compounded DeFi Farming
            </h3>
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-green-600 mb-1">Active</p>
        <p className="text-sm font-medium mb-4">
          10% - 1000% Annual Yield (Subject to Market Variations)
        </p>
        <p className="text-sm mb-6">Higher APY, potentially higher risk.</p>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="amount-bskegld">Deposit Amount</Label>
            <Input
              id="amount-bskegld"
              name="amount"
              placeholder="$0.00"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.amount}
              isInvalid={
                Boolean(formik.touched.amount) && Boolean(formik.errors.amount)
              }
            />
            {/* <div className="flex justify-between mt-3 text-xs mb-2">
              <p className="text-red-700">{formik.errors.amount}</p>
              <p className="cursor-pointer" onClick={handleMax}>
                Balance: {formatBalance(userStakedToken)} EGLD
              </p>
            </div> */}
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              Deposit Funds
            </Button>
          </DialogFooter>

          <p
            className="text-sm italic mt-4"
            style={{
              textAlign: "center",
            }}
          >
            No lock period, you can withdraw anytime.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StakeModal;
