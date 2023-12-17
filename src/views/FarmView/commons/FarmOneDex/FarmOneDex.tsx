"use client";
import { IOnDexFarm } from "@/types/farm.interface";
import { useGetOneDexFarms } from "@/views/FarmView/commons/FarmOneDex/utils/hooks";
import { createContext } from "react";
import FarmItem from "./FarmItem";

interface IOneDexContext {
  farm?: IOnDexFarm;
}

export const OneDexFarmContext = createContext<IOneDexContext>({
  farm: undefined,
});

const FarmOneDex = () => {
  // new data
  const { farms } = useGetOneDexFarms();

  return (
    <div className="mt-10">
      <div className="text-left mb-2 text-yellow-700"> OneDex Farms</div>

      <div className="flex flex-col gap-8">
        {farms.map((f) => {
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
