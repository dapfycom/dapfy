"use client";
import { IOnDexFarm } from "@/types/farm.interface";
import { useGetAshSwapFarms } from "@/views/FarmView/commons/FarmOneDex/utils/hooks";
import { createContext } from "react";
import FarmItem from "./FarmItem";

interface IAshFarmContext {
  farm?: IOnDexFarm;
}

export const AshFarmContext = createContext<IAshFarmContext>({
  farm: undefined,
});

const FarmOneDex = () => {
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

export default FarmOneDex;
