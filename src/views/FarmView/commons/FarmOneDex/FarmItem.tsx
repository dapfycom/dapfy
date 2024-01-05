import Divider from "@/components/Divider/Divider";
import { PointerIcon } from "@/components/ui-system/icons/ui-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectedNetwork } from "@/config/network";
import useGetAccountToken from "@/hooks/useGetAccountToken";
import { formatBalance, getRealBalance } from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { useFormik } from "formik";
import { useContext } from "react";
import * as yup from "yup";
import { OneDexFarmContext } from "./FarmOneDex";
import StakedDetails from "./common/StakedInfo/StakedDetails/StakedDetails";
import { stake } from "./utils/services";

const FarmItem = () => {
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
    <div className="px-4 pb-5 text-left">
      <div className="max-w-[24rem] border rounded-lg p-6">
        <div>
          <div>
            {" "}
            <h3 className="text-lg font-semibold mb-4">
              Auto-Compounded DeFi Farming
            </h3>
          </div>
        </div>

        <p className="text-sm text-green-600 mb-1">Active</p>
        <p className="text-sm font-medium mb-4">
          10% - 1000% Annual Yield (Subject to Market Variations)
        </p>
        <p className="text-sm mb-6">Higher APY, potentially higher risk.</p>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between">
              <Label htmlFor="amount-bskegld">Deposit Amount</Label>
              <div className="flex justify-between text-xs">
                <p className="cursor-pointer" onClick={handleMax}>
                  Balance: {formatBalance(userStakedToken)}{" "}
                  {formatTokenI(userStakedToken.identifier)}
                </p>
              </div>
            </div>
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
            <p className="text-red-700 text-xs">{formik.errors.amount}</p>
          </div>

          <div>
            <Button
              key="1"
              className="bg-[#ff9900] text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full"
            >
              <PointerIcon className="text-white h-6 w-6" />
              <span>Deposit now with 1-Click®</span>
            </Button>
          </div>

          <p
            className="text-sm italic mt-4"
            style={{
              textAlign: "center",
            }}
          >
            No lock period, you can withdraw anytime.
          </p>

          <Divider className="mt-4" />
          <div className="my-3">
            <div className="mb-2">My positions</div>

            <StakedDetails onModal />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmItem;
