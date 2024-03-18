"use client";
import Collapse from "@/components/Collapse/Collapse";
import Divider from "@/components/Divider/Divider";
import TokenImage from "@/components/TokenImage/TokenImage";
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
import { useStakeBskInfo } from "@/views/FarmView/utils/hooks";
import {
  claimBskRewards,
  restakeBsk,
  stakeBSK,
} from "@/views/FarmView/utils/services";
import { useFormik } from "formik";
import * as yup from "yup";
import StakedDetails from "./StakedDetails";
import WithdrawModal from "./WithdrawModal";

const StakeBSK = () => {
  const { data } = useStakeBskInfo();
  const { handleConnect, isLoggedIn } = useAuthentication();
  const { isOpen, onToggle } = useDisclosure();
  const { elrondToken } = useGetElrondToken(selectedNetwork.tokensID.bsk);
  const [price] = useGetTokenPrice(selectedNetwork.tokensID.bsk);

  const { accountToken: userStakedToken } = useGetAccountToken(
    selectedNetwork.tokensID.bsk
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
      .min(
        // @ts-ignore
        getRealBalance(
          data.minimumStaking,
          userStakedToken.decimals,
          true
        ).toString() as number,
        "Minimum stake is " +
          formatBalance({
            balance: data.minimumStaking,
            decimals: userStakedToken.decimals,
          })
      )
      .max(
        // @ts-ignore
        getRealBalance(
          userStakedToken.balance,
          userStakedToken.decimals,
          true
        ).toString() as number,
        "Insufficient funds"
      ),
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: (values) => {
      let amount = values.amount;
      stakeBSK(amount, elrondToken);
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

  const handleWithdraw = () => {
    onCloseHarvest();
    onOpenHarvest();
  };

  const handleReStake = () => {
    restakeBsk();
  };

  const handleClaim = () => {
    claimBskRewards();
  };
  return (
    <>
      <div className="w-full my-10 flex  text-left">
        <div className="max-w-[24rem] w-full rounded-lg border p-6">
          <div className="mb-4">
            <div className="flex items-center gap-3">
              {" "}
              <h3 className="text-lg font-semibold">STAKE BSK</h3>
              {elrondToken && (
                <TokenImage src={elrondToken.assets.svgUrl} size={32} />
              )}
            </div>
          </div>

          {data && elrondToken && (
            <div className="mb-2">
              <h4 className="flex gap-2">
                TVL:
                <span className="">
                  $
                  {formatBalanceDollar(
                    { balance: data.staked, decimals: elrondToken.decimals },
                    price,
                    true
                  )}
                </span>{" "}
              </h4>
              <h4 className="flex gap-2">
                Users:
                <span className="">{data.totalUsers}</span>{" "}
              </h4>

              <h4 className="flex gap- 2 text-yellow-600">10% APY</h4>
            </div>
          )}

          <p className="text-sm text-green-600 mb-1">Active</p>

          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-2 mb-4">
              {/* <Label htmlFor="amount-bskegld">BSK-EGLD Amount</Label> */}
              <div className="flex justify-between">
                <Label
                  htmlFor="amount-bskegld"
                  className="hidden sm:block text-right"
                >
                  Deposit BSK
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
              {Boolean(formik.touched.amount) &&
                Boolean(formik.errors.amount) && (
                  <p className="text-red-700 text-xs">{formik.errors.amount}</p>
                )}
            </div>

            <DialogFooter>
              {isLoggedIn ? (
                <Button
                  type="submit"
                  className=" text-xs sm:text-md text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full"
                >
                  <PointerIcon className="h-6 w-6 hidden sm:inline-block" />

                  <span>Deposit now with 1-Click®</span>
                </Button>
              ) : (
                <Button
                  onClick={handleConnect}
                  className=" text-xs sm:text-md text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full"
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
              <Button
                variant={"secondary"}
                className="text-sm w-full  bg-blue-600 hover:text-blue-500 text-white"
                onClick={handleClaim}
              >
                Claim
              </Button>
            </div>
            <Divider className="my-4" />
            <div className="grid gap-3">
              <Button
                variant={"secondary"}
                className="text-sm w-full lg:w-auto bg-green-600 hover:text-green-500 text-white"
                onClick={handleReStake}
              >
                Restake
              </Button>
              <Button
                variant={"secondary"}
                className="w-full md:w-auto text-sm bg-red-500 text-white hover:text-red-700"
                onClick={handleWithdraw}
              >
                {" "}
                Unstake
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

export default StakeBSK;
