"use client";
import { IAshFarm } from "@/types/farm.interface";
import {
  useGetAshFarmApr,
  useGetAshSwapFarms,
} from "@/views/FarmView/commons/FarmAshSwap/utils/hooks";
import { createContext } from "react";
import FarmItem from "./FarmItem";
import { FarmRecord } from "./type";

interface IAshFarmContext {
  farm?: IAshFarm;
  ashSwapInfo: Partial<FarmRecord> | undefined;
}

export const AshFarmContext = createContext<IAshFarmContext>({
  farm: undefined,
  ashSwapInfo: undefined,
});

const FarmAshSwap = () => {
  // new data
  const { farms } = useGetAshSwapFarms();

  const { farmRecords } = useGetAshFarmApr();
  console.log({ farmRecords });

  return (
    <div className="mt-10">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3   gap-8">
        {farms.map((f) => {
          const ashSwapInfo = farmRecords.find(
            (ashFarmData) =>
              ashFarmData.farm?.farm_address === f.farm_address &&
              ashFarmData.pool?.address === f.pool_address
          );
          return (
            <AshFarmContext.Provider
              key={f.farm_click_id}
              value={{
                farm: f,
                ashSwapInfo: ashSwapInfo,
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
