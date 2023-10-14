"use client";
import Collapse from "@/components/Collapse/Collapse";
import Divider from "@/components/Divider/Divider";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { routeNames } from "@/config/routes";
import useDisclosure from "@/hooks/useDisclosure";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import {
  IMoneyMarkeTvl,
  IMoneyMarketDeposit,
  IMoneyMarketReward,
} from "@/types/hatom.interface";
import { formatBalanceDolar } from "@/utils/functions/formatBalance";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FarmInfo from "./common/FarmInfo/FarmInfo";
import FarmMainButtons from "./common/FarmMainButtons/FarmMainButtons";
import StakedInfo from "./common/StakedInfo/StakedInfo";

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
  const { isOpen, onToggle } = useDisclosure();
  const { elrondToken } = useGetElrondToken(hatomFarm.moneyMarket.tokenI);
  const [price] = useGetTokenPrice(hatomFarm.moneyMarket.tokenI);

  return (
    <FarmContext.Provider
      value={{
        hatomFarm: hatomFarm,
        userRewards: userInfo.userRewards,
        deposits: userInfo.deposits,
      }}
    >
      <div className="flex gap-2 w-full items-center mt-10 mb-4">
        <Label className="">Protocol: </Label>
        <div className="px-4 py-1 border rounded-md">HATOM</div>
      </div>
      <Card className="w-full  px-4">
        <CardContent className="space-y-2 pt-6">
          <div
            className="flex justify-between items-center cursor-pointer flex-col sm:flex-row"
            onClick={onToggle}
          >
            <div className="flex items-center gap-4">
              {elrondToken?.assets?.svgUrl && (
                <div className="w-[50px] h-[50px]">
                  <Image
                    src={elrondToken.assets.svgUrl}
                    alt="hatom"
                    width={50}
                    height={50}
                  />{" "}
                </div>
              )}
              {hatomFarm?.tvl && (
                <div className="flex flex-col ">
                  <p className="whitespace-nowrap mb-2">Total Value Locked</p>
                  <p className="text-[12px] text-muted-foreground">
                    $
                    {formatBalanceDolar(
                      {
                        balance: hatomFarm.tvl,
                        decimals: elrondToken.decimals,
                      },
                      price,
                      true
                    )}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-7 flex-col sm:flex-row flex-1 justify-end">
              <FarmInfo />
              <FarmMainButtons isOpen={isOpen} />
            </div>
          </div>
        </CardContent>
        {isOpen && <Divider className="mb-4" />}

        <Collapse isOpen={isOpen}>
          <StakedInfo />
        </Collapse>
      </Card>

      <p className="mt-20">
        Don&apos;t have any LP tokens? Buy LP{" "}
        <Link href={routeNames.swapLp} className="text-blue-700">
          here
        </Link>
      </p>
    </FarmContext.Provider>
  );
};

export default FarmComponent;
