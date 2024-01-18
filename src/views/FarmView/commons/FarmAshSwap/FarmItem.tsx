import Collapse from "@/components/Collapse/Collapse";
import Divider from "@/components/Divider/Divider";
import LpTokenImage from "@/components/LpTokenImage/LpTokenImage";
import { PointerIcon } from "@/components/ui-system/icons/ui-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectedNetwork } from "@/config/network";
import useAuthentication from "@/hooks/useAuthentication";
import useDisclosure from "@/hooks/useDisclosure";
import useGetAccountToken from "@/hooks/useGetAccountToken";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import {
  formatBalance,
  formatNumber,
  getRealBalance,
} from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { useFormik } from "formik";
import { ArrowRight } from "lucide-react";
import { useContext } from "react";
import { AshFarmContext } from "./FarmAshSwap";
import StakedDetails from "./common/StakedInfo/StakedDetails/StakedDetails";
import { stake, withdraw } from "./utils/services";

const FarmItem = () => {
  const { farm, ashSwapInfo } = useContext(AshFarmContext);
  const { handleConnect, isLoggedIn } = useAuthentication();

  const lpTokenIdentifier = farm?.lp_token_id || "";

  const { elrondToken } = useGetElrondToken(lpTokenIdentifier);

  const [price] = useGetTokenPrice(lpTokenIdentifier);

  const { isOpen, onToggle } = useDisclosure();

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
            {elrondToken && (
              <LpTokenImage
                token1lp={farm.first_token_id}
                token2lp={farm.second_token_id}
              />
            )}
          </div>
        </div>

        <p className="text-sm text-green-600 mb-1">Active</p>
        <p className="text-sm font-medium mb-4">
          {ashSwapInfo && (
            <div className="flex  items-center">
              <span>APR </span>
              <div className="h-8 px-2.5 space-x-1.5 border border-black bg-stake-gray-500/10 flex items-center text-sm font-bold text-muted-foreground">
                <div>
                  <span className="underline">
                    {formatNumber(ashSwapInfo?.totalAPRMin)}
                  </span>
                  <span className="text-2xs">%</span>
                </div>
                <ArrowRight className="w-3 h-auto" />
                <div>
                  <span className="underline">
                    {formatNumber(ashSwapInfo?.totalAPRMax)}
                  </span>
                  <span className="text-2xs">%</span>
                </div>
              </div>
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
            {isLoggedIn ? (
              <Button
                type="submit"
                className="bg-[#ff9900] hover:text-[#ff9900] text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full"
              >
                <PointerIcon className="h-6 w-6" />
                <span>Deposit now with 1-Click®</span>
              </Button>
            ) : (
              <Button
                onClick={handleConnect}
                className="bg-[#ff9900] hover:text-[#ff9900] text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full"
              >
                <PointerIcon className="h-6 w-6" />
                <span>Deposit now with 1-Click®</span>
              </Button>
            )}
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
