import TokenImage from "@/components/TokenImage/TokenImage";
import Loader1 from "@/components/ui-system/Loader/Loader1";
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
import useGetElrondToken from "@/hooks/useGetElrondToken";
import {
  formatBalance,
  setElrondBalance,
} from "@/utils/functions/formatBalance";
import { useGetStakeBskUserInfo } from "@/views/FarmView/utils/hooks";
import { unstakeBsk } from "@/views/FarmView/utils/services";
import { useFormik } from "formik";
import { AlertCircle } from "lucide-react";
import * as yup from "yup";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const WithdrawModal = ({ isOpen, onClose }: IProps) => {
  const { data } = useGetStakeBskUserInfo();
  const { elrondToken: stakedToken, isLoading } = useGetElrondToken(
    selectedNetwork.tokensID.bsk
  );

  const stakeSchema = yup.object({
    amount: yup
      .number()

      .min(0, "Negative number")
      .max(
        formatBalance(
          {
            balance: data.staked || 0,
            decimals: stakedToken.decimals,
          },
          true,
          18
        ) as number,
        "Insufficient funds"
      ),
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: (values) => {
      onClose();
      unstakeBsk(setElrondBalance(values.amount, stakedToken.decimals));
    },
    validationSchema: stakeSchema,
  });
  const handleMax = () => {
    const value = formatBalance(
      { balance: data.staked || 0, decimals: stakedToken.decimals },
      true,
      18
    );
    formik.setFieldValue("amount", value);
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full sm:max-w-[500px]">
        {isLoading ? (
          <Loader1 />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {" "}
                <div className="flex items-center gap-3">
                  <TokenImage src={stakedToken?.assets.svgUrl} size={32} />
                  <h3>Unstake BSK</h3>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-md">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm flex-1">
                {" "}
                Can&apos;t leave less than 1,000,000 BSK on staking
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-2">
                <Input
                  id="amount-bsk"
                  name="amount"
                  placeholder="Amount"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.amount}
                  isInvalid={
                    formik.touched.amount && Boolean(formik.errors.amount)
                  }
                />

                <div className="flex justify-between mt-3 text-xs mb-2">
                  <p className="text-red-700">{formik.errors.amount}</p>
                  <p className="cursor-pointer" onClick={handleMax}>
                    Balance:{" "}
                    {formatBalance({
                      balance: data.staked || 0,
                      decimals: stakedToken.decimals,
                    })}
                  </p>
                </div>
              </div>

              <DialogFooter>
                <div className="flex-col flex w-full">
                  <Button className="w-full" type="submit">
                    Unstake
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawModal;
