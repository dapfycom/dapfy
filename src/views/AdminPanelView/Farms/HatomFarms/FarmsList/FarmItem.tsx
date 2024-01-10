"use client";
import Collapse from "@/components/Collapse/Collapse";
import Divider from "@/components/Divider/Divider";
import { Button } from "@/components/ui/button";
import useDisclosure from "@/hooks/useDisclosure";
import useGetAccountToken from "@/hooks/useGetAccountToken";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import { IMoneyMarkeTvl } from "@/types/hatom.interface";
import { formatBalanceDollar } from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { HatomConfigs } from "@/views/DefiView/utils/constants";
import Image from "next/image";
import React from "react";
import ClaimRewardsBtn from "./ClaimRewardsBtn/ClaimRewardsBtn";

interface IDefiContext {
  hatomFarm?: IMoneyMarkeTvl;
}

export const FarmContext = React.createContext<IDefiContext>({
  hatomFarm: undefined,
});
interface FarmComponentProps {
  hatomFarm: IMoneyMarkeTvl;
}
const FarmItem = ({ hatomFarm }: FarmComponentProps) => {
  const { isOpen, onToggle } = useDisclosure();

  const { elrondToken } = useGetElrondToken(hatomFarm.moneyMarket.tokenI);

  const minAmounts = HatomConfigs.minDeposit;

  const { accountToken: userStakedToken } = useGetAccountToken(
    hatomFarm?.moneyMarket.tokenI || ""
  );

  // @ts-ignore
  const apy = HatomConfigs.apy[formatTokenI(hatomFarm?.moneyMarket.tokenI)];

  return (
    <FarmContext.Provider
      value={{
        hatomFarm: hatomFarm,
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

          {elrondToken && (
            <p className="text-sm  flex gap-2 mb-2">
              TVL{" "}
              {
                <span className="text-muted-foreground">
                  $
                  {formatBalanceDollar(
                    {
                      balance: hatomFarm.tvl,
                      decimals: elrondToken.decimals,
                    },
                    elrondToken.price,
                    true
                  )}
                </span>
              }
            </p>
          )}

          <Collapse isOpen={isOpen}>
            <Divider className="my-4" />
            <div className="grid gap-3">
              <ClaimRewardsBtn />
            </div>
          </Collapse>

          <div className="flex justify-center mt-6">
            <Button variant={"outline"} size={"xs"} onClick={onToggle}>
              {isOpen ? "Less" : "More"} info
            </Button>
          </div>
        </div>
      </div>
    </FarmContext.Provider>
  );
};

export default FarmItem;
