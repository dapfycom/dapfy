import { LpTokenImageV2 } from "@/components/LpTokenImage/LpTokenImage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { selectedNetwork } from "@/config/network";
import useGetAccountToken from "@/hooks/useGetAccountToken";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import { formatBalance, getRealBalance } from "@/utils/functions/formatBalance";
import {
  stake,
  stakeLP,
} from "@/views/FarmView/commons/FarmAshSwap/utils/services";
import { useFormik } from "formik";
import { useContext } from "react";
import * as yup from "yup";
import { AshFarmContext } from "../../FarmOneDex";
import { formatTokenI } from "@/utils/functions/tokens";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const StakeModal = ({ isOpen, onClose }: IProps) => {
  const { farm } = useContext(AshFarmContext);
  const { accountToken: userStakedToken } = useGetAccountToken(
    selectedNetwork.tokensID.egld
  );
  console.log("farm", farm);

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
    // validationSchema: stakeSchema,
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {" "}
            <div className="flex items-center gap-3">
              <LpTokenImageV2 lpToken={userStakedToken} size={25} />
              <h3>
                Stake in {formatTokenI(farm.first_token_id)}-
                {formatTokenI(farm.second_token_id)} farm
              </h3>
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
                Balance: {formatBalance(userStakedToken)} EGLD
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
