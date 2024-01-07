import Collapse from "@/components/Collapse/Collapse";
import Divider from "@/components/Divider/Divider";
import LpTokenImage from "@/components/LpTokenImage/LpTokenImage";
import { PointerIcon } from "@/components/ui-system/icons/ui-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectedNetwork } from "@/config/network";
import useDisclosure from "@/hooks/useDisclosure";
import useGetAccountToken from "@/hooks/useGetAccountToken";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import {
  formatBalance,
  formatNumber,
  getRealBalance,
} from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { mutate } from "swr";
import * as yup from "yup";
import { OneDexFarmContext } from "./FarmOneDex";
import StakedDetails from "./common/StakedInfo/StakedDetails/StakedDetails";
import { useGetApr } from "./utils/hooks";
import { stake, withdraw } from "./utils/services";

const FarmItem = () => {
  const { isOpen, onToggle } = useDisclosure();

  const { farm } = useContext(OneDexFarmContext);
  const address = useAppSelector(selectUserAddress);
  const { accountToken: userStakedToken } = useGetAccountToken(
    selectedNetwork.tokensID.egld
  );
  const lpTokenIdentifier = farm?.lp_token_id || "";
  const [sessionId, setSessionId] = useState<string | null>("");

  const { elrondToken } = useGetElrondToken(lpTokenIdentifier);
  const { apr, error, isLoading: isLoadingApr } = useGetApr();
  const onSuccess = () => {
    mutate([
      "oneDexFarmWsp:getTotalRewardsPerFarm",
      address,
      farm?.farm_click_id,
    ]);
  };

  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess,
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: async (values) => {
      let amount = values.amount;
      if (farm?.farm_click_id) {
        const res = await stake(amount, farm.farm_click_id);
        setSessionId(res?.sessionId);
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
  const handleHarvest = (e: any) => {
    e.stopPropagation();
    withdraw(farm?.farm_click_id);
  };

  return (
    <div className="text-left">
      <div className="max-w-[24rem] border rounded-lg p-6">
        <div>
          <div className="flex items-center gap-3">
            {" "}
            <h3 className="text-lg font-semibold ">
              {formatTokenI(farm.first_token_id)}-
              {formatTokenI(farm.second_token_id)}
            </h3>
            {elrondToken && <LpTokenImage lpToken={elrondToken} />}
          </div>
        </div>

        <p className="text-sm text-green-600 mb-1">Active</p>
        <p className="text-sm font-medium mb-4">
          {apr?.gt(0) && (
            <div className="flex gap-3">
              <p className="whitespace-nowrap mb-2 " color="white">
                APR
              </p>
              <p className=" whitespace-nowrap text-muted-foreground">
                ≈ {formatNumber(apr?.toString())} %
              </p>
            </div>
          )}
        </p>

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
              placeholder={formatTokenI(userStakedToken.identifier)}
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
              className="bg-[#ff9900] hover:text-[#ff9900] text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full"
            >
              <PointerIcon className="h-6 w-6" />
              <span>Deposit now with 1-Click®</span>
            </Button>
          </div>
        </form>

        <p
          className="text-sm italic mt-4"
          style={{
            textAlign: "center",
          }}
        >
          No lock period, you can withdraw anytime.
        </p>
        <Collapse isOpen={isOpen}>
          <Divider className="mt-4" />
          <div className="my-3">
            <div className="mb-2">My positions</div>

            <StakedDetails onModal />
          </div>
          <Divider className="my-4" />
          <div className="grid gap-3">
            <Button
              className="w-full md:w-auto text-sm bg-red-500 text-white hover:text-red-700"
              onClick={handleHarvest}
            >
              {" "}
              withdraw
            </Button>
          </div>
        </Collapse>

        <div className="flex justify-center mt-6">
          <Button variant={"outline"} size={"xs"} onClick={onToggle}>
            {isOpen ? "Less" : "More"} info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FarmItem;
