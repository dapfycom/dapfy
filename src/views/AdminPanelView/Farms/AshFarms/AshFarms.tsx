"use client";
import { AshFarmContext } from "@/views/FarmView/commons/FarmAshSwap/FarmAshSwap";
import {
  useGetAshFarmApr,
  useGetAshSwapFarms,
} from "@/views/FarmView/commons/FarmAshSwap/utils/hooks";
import BigNumber from "bignumber.js";
import Image from "next/image";
import FarmItem from "./FarmItem";

const AshFarms = () => {
  // new data
  const { farms } = useGetAshSwapFarms();

  const { farmRecords } = useGetAshFarmApr();

  return (
    <div className="mt-10 grid">
      <div className="mb-5">
        <Image
          src={"https://app.ashswap.io/logo.png"}
          alt="ashswap"
          width={70}
          height={24}
        />
      </div>
      <div className="mt-10">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3   gap-8">
          {farms
            .filter((f) =>
              new BigNumber(f.total_deposited_amount).isGreaterThan(0)
            )
            .map((f) => {
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
    </div>
  );
};

export default AshFarms;
