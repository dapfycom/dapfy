"use client";
import { IOnDexFarm } from "@/types/farm.interface";
import { useGetOneDexFarms } from "@/views/FarmView/commons/FarmOneDex/utils/hooks";
import { createContext } from "react";
import FarmItem from "./FarmItem";
import { allowedFarms } from "./utils/config";

interface IOneDexContext {
  farm?: IOnDexFarm;
}

export const OneDexFarmContext = createContext<IOneDexContext>({
  farm: undefined,
});

const FarmOneDex = () => {
  // new data
  const { farms } = useGetOneDexFarms();
  console.log({ farms });

  return (
    <div className="mt-10 grid">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3   gap-8">
        {farms
          .filter((f) => allowedFarms.includes(f.farm_click_id))
          .map((f) => {
            return (
              <OneDexFarmContext.Provider
                key={f.farm_click_id}
                value={{
                  farm: f,
                }}
              >
                <FarmItem />
              </OneDexFarmContext.Provider>
            );
          })}
      </div>
    </div>
  );
};

export default FarmOneDex;
