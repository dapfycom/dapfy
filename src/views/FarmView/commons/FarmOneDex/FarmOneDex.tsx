"use client";
import Collapse from "@/components/Collapse/Collapse";
import Divider from "@/components/Divider/Divider";
import { LpTokenImageV2 } from "@/components/LpTokenImage/LpTokenImage";
import { Card, CardContent } from "@/components/ui/card";
import { selectedNetwork } from "@/config/network";
import useDisclosure from "@/hooks/useDisclosure";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import { formatBalanceDollar } from "@/utils/functions/formatBalance";
import {
  useGetAshSwapFarms,
  useGetFarmsInfo,
} from "@/views/FarmView/commons/FarmAshSwap/utils/hooks";
import Link from "next/link";
import FarmInfo from "./common/FarmInfo/FarmInfo";
import FarmMainButtons from "./common/FarmMainButtons/FarmMainButtons";
import StakedInfo from "./common/StakedInfo/StakedInfo";
import { createContext } from "react";
import { IAshFarm } from "@/types/farm.interface";
import FarmItem from "./FarmItem";

interface IAshFarmContext {
  farm?: IAshFarm;
}

export const AshFarmContext = createContext<IAshFarmContext>({
  farm: undefined,
});

const FarmAshSwap = () => {
  // new data
  const { farms } = useGetAshSwapFarms();

  return (
    <div className="mt-10">
      <div className="text-left mb-2 text-yellow-700"> OneDex Farms</div>

      <div className="flex flex-col gap-8">
        {farms.map((f) => {
          console.log("f", f);

          return (
            <AshFarmContext.Provider
              key={f.farm_click_id}
              value={{
                farm: f,
              }}
            >
              <FarmItem />
            </AshFarmContext.Provider>
          );
        })}
      </div>
    </div>
  );
};

export default FarmAshSwap;
