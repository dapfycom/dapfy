"use client";
import Collapse from "@/components/Collapse/Collapse";
import Divider from "@/components/Divider/Divider";
import LpTokenImage from "@/components/LpTokenImage/LpTokenImage";
import { PointerIcon } from "@/components/ui-system/icons/ui-icons";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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
  formatBalanceDollar,
  getRealBalance,
} from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { useGetFarmsInfo } from "@/views/FarmView/utils/hooks";
import { withdraw } from "@/views/FarmView/utils/services";
import { useFormik } from "formik";
import * as yup from "yup";
import { stakeLP } from "../../utils/services";
import WithdrawModal from "./common/Modals/WithdrawModal";
import StakedDetails from "./common/StakedInfo/StakedDetails/StakedDetails";

const FarmComponent = () => {
  const { handleConnect, isLoggedIn } = useAuthentication();
  const { isOpen, onToggle } = useDisclosure();
  const { elrondToken } = useGetElrondToken(selectedNetwork.tokensID.bskwegld);
  const { data: farmInfo } = useGetFarmsInfo();
  const [price] = useGetTokenPrice(selectedNetwork.tokensID.bskwegld);
  const { elrondToken: stakedToken, isLoading } = useGetElrondToken(
    selectedNetwork.tokensID.bskwegld
  );

  const { accountToken: userStakedToken } = useGetAccountToken(
    selectedNetwork.tokensID.bskwegld
  );
  const {
    isOpen: isOpenHarvest,
    onClose: onCloseHarvest,
    onOpen: onOpenHarvest,
  } = useDisclosure();
  const stakeSchema = yup.object({
    amount: yup
      .number()
      .required("This field is required")
      .min(0, "Negative number")
      .max(
        formatBalance(userStakedToken, true, 18) as number,
        "Insufficient funds"
      ),
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: (values) => {
      let amount = values.amount;
      stakeLP(amount, stakedToken);
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

  const handleHarvest = () => {
    onCloseHarvest();
    onOpenHarvest();
  };

  const handleWithdraw = () => {
    withdraw();
  };
  return (
    <>
      <div className="w-full my-10 flex  text-left">
        <div className="max-w-[24rem] w-full rounded-lg border p-6">
          <div className="mb-4">
            <div className="flex items-center gap-3">
              {" "}
              <h3 className="text-lg font-semibold">BSK-EGLD</h3>
              {elrondToken && <LpTokenImage lpToken={elrondToken} />}
            </div>
          </div>

          {farmInfo && (
            <div className="mb-2">
              <h4 className="flex gap-2">
                TVL:
                <span className="">
                  $
                  {formatBalanceDollar(
                    { balance: farmInfo.stakedLp, decimals: 18 },
                    price,
                    true
                  )}
                </span>{" "}
              </h4>
            </div>
          )}

          <p className="text-sm text-green-600 mb-1">Active</p>
          <p className="text-sm font-medium mb-4">APR 100%</p>

          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-2 mb-4">
              {/* <Label htmlFor="amount-bskegld">BSK-EGLD Amount</Label> */}
              <div className="flex justify-between">
                <Label
                  htmlFor="amount-bskegld"
                  className="hidden sm:block text-right"
                >
                  Deposit LP
                </Label>
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
                  Boolean(formik.touched.amount) &&
                  Boolean(formik.errors.amount)
                }
              />
              <p className="text-red-700 text-xs">{formik.errors.amount}</p>
            </div>

            <DialogFooter>
              {isLoggedIn ? (
                <Button
                  type="submit"
                  className="bg-[#ff9900] hover:text-[#ff9900] text-xs sm:text-md text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full"
                >
                  <PointerIcon className="h-6 w-6 hidden sm:inline-block" />

                  <span>Deposit now with 1-Click®</span>
                </Button>
              ) : (
                <Button
                  onClick={handleConnect}
                  className="bg-[#ff9900] hover:text-[#ff9900] text-xs sm:text-md text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full"
                >
                  <PointerIcon className="h-6 w-6 hidden sm:inline-block" />

                  <span>Deposit now with 1-Click®</span>
                </Button>
              )}
            </DialogFooter>
          </form>

          <Collapse isOpen={isOpen}>
            <Divider className="mt-4" />
            <div className="my-3">
              <div className="mb-2">My positions</div>

              <StakedDetails onModal />
            </div>
            <Divider className="my-4" />
            <div className="grid gap-3">
              <Button
                className="text-sm w-full lg:w-auto bg-green-600 hover:text-green-500 text-white"
                onClick={handleWithdraw}
              >
                Harvest
              </Button>
              <Button
                className="w-full md:w-auto text-sm bg-red-500 text-white hover:text-red-700"
                onClick={handleHarvest}
              >
                {" "}
                withdraw
              </Button>

              {isOpenHarvest && (
                <WithdrawModal
                  isOpen={isOpenHarvest}
                  onClose={onCloseHarvest}
                />
              )}
            </div>
          </Collapse>

          <div className="flex justify-center mt-6">
            <Button variant={"outline"} size={"xs"} onClick={onToggle}>
              {isOpen ? "Less" : "More"} info
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmComponent;
