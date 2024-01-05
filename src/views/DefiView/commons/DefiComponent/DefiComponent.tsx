"use client";
import Divider from "@/components/Divider/Divider";
import { PointerIcon } from "@/components/ui-system/icons/ui-icons";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetAccountToken from "@/hooks/useGetAccountToken";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import {
  IMoneyMarkeTvl,
  IMoneyMarketDeposit,
  IMoneyMarketReward,
} from "@/types/hatom.interface";
import { formatBalance, getRealBalance } from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import * as yup from "yup";
import { HatomConfigs } from "../../utils/constants";
import { claimUserRewards, deposit, withdraw } from "../../utils/services";
import StakedDetails from "./common/StakedInfo/StakedDetails/StakedDetails";

interface IDefiContext {
  hatomFarm?: IMoneyMarkeTvl;
  userRewards?: IMoneyMarketReward;
  deposits?: IMoneyMarketDeposit[];
}

export const FarmContext = React.createContext<IDefiContext>({
  hatomFarm: undefined,
  userRewards: undefined,
  deposits: [],
});
interface FarmComponentProps {
  hatomFarm: IMoneyMarkeTvl;
  userInfo: {
    userRewards?: IMoneyMarketReward;
    deposits?: IMoneyMarketDeposit[];
  };
}
const FarmComponent = ({ hatomFarm, userInfo }: FarmComponentProps) => {
  const [sessionId, setSessionId] = useState<string | null>("");
  const { elrondToken } = useGetElrondToken(hatomFarm.moneyMarket.tokenI);

  const minAmounts = HatomConfigs.minDeposit;

  const { elrondToken: stakedToken } = useGetElrondToken(
    hatomFarm?.moneyMarket.tokenI || null
  );
  const { accountToken: userStakedToken } = useGetAccountToken(
    hatomFarm?.moneyMarket.tokenI || ""
  );

  const ticker = hatomFarm?.moneyMarket.tokenI
    ? formatTokenI(hatomFarm?.moneyMarket.tokenI)
    : "";
  // @ts-ignore
  const minAmountToStake = minAmounts[ticker] || 0.00001;

  const stakeSchema = yup.object({
    amount: yup
      .number()
      .min(
        minAmountToStake + 0.00001,
        `The minimum amount is more than ${minAmountToStake} ${ticker}`
      )
      .max(
        formatBalance(userStakedToken, true, 18) as number,
        "Insufficient funds"
      ),
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

  const handleClaimRewards = () => {
    if (hatomFarm) {
      claimUserRewards(hatomFarm?.moneyMarket.childScAddress);
    }
  };

  const handleWithdraw = (e: any) => {
    if (hatomFarm) {
      withdraw(hatomFarm.moneyMarket.childScAddress);
    }
  };

  // @ts-ignore
  const apy = HatomConfigs.apy[formatTokenI(hatomFarm?.moneyMarket.tokenI)];

  return (
    <FarmContext.Provider
      value={{
        hatomFarm: hatomFarm,
        userRewards: userInfo.userRewards,
        deposits: userInfo.deposits,
      }}
    >
      <div className="w-full text-left">
        <div className="w-full rounded-lg border p-6">
          <div>
            <div className="flex items-center gap-3">
              {" "}
              <h3 className="text-lg font-semibold">
                {formatTokenI(hatomFarm.moneyMarket.tokenI)} Pool
              </h3>
              {elrondToken?.assets?.svgUrl && (
                <div className="w-[40px] h-[40px]">
                  <Image
                    src={elrondToken.assets.svgUrl}
                    alt="hatom"
                    width={40}
                    height={40}
                  />{" "}
                </div>
              )}
            </div>
          </div>

          <p className="text-sm text-green-600 mb-1">Active</p>
          <p className="text-sm font-medium mb-4">
            {apy && (
              <div className="flex gap-3">
                <p className="whitespace-nowrap mb-2 " color="white">
                  APY
                </p>
                <p className="whitespace-nowrap text-muted-foreground">
                  ≈ {apy} %
                </p>
              </div>
            )}
          </p>

          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-2 mb-4">
              {/* <Label htmlFor="amount-bskegld">BSK-EGLD Amount</Label> */}
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
                placeholder="Amount"
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
              <Button
                key="1"
                type="submit"
                className="bg-[#ff9900] text-white hover:text-[#ff9900] px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full"
              >
                <PointerIcon className="h-6 w-6" />
                <span>Deposit now with 1-Click®</span>
              </Button>
            </DialogFooter>
          </form>

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

            <StakedDetails onModal={true} />
          </div>
          <Divider className="my-4" />
          <div className="grid gap-3">
            <Button
              className="text-sm w-full bg-green-600 text-white hover:text-green-500"
              onClick={handleClaimRewards}
            >
              Claim rewards
            </Button>

            <Button
              className="w-full md:w-auto text-sm hover:text-red-700 bg-red-500 text-white"
              onClick={handleWithdraw}
            >
              {" "}
              withdraw
            </Button>
          </div>
        </div>
      </div>
    </FarmContext.Provider>
  );
};

export default FarmComponent;
