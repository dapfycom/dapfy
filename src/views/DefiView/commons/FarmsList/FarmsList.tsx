"use client";
import { formatTokenI } from "@/utils/functions/tokens";
import { hiddenPools } from "../../utils/constants";
import { useGetTvl, useGetUserInfo } from "../../utils/hooks";
import FarmComponent from "../DefiComponent/DefiComponent";

const FarmsList = () => {
  // const hatomData = useGetHatomFarms();
  const userHatomData = useGetUserInfo();
  const hatomData = useGetTvl();

  return (
    <div className="w-full mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3   gap-8 ">
      {hatomData.tlvs
        .filter(
          (f) => !hiddenPools.includes(formatTokenI(f.moneyMarket.tokenI))
        )
        .map((farm) => {
          const userReward = userHatomData?.rewards?.find(
            (reward) => reward.moneyMarket.tokenI === farm.moneyMarket.tokenI
          );
          const userDeposits = userHatomData?.deposits?.filter(
            (deposit) => deposit.moneyMarket.tokenI === farm.moneyMarket.tokenI
          );
          return (
            <FarmComponent
              key={farm.moneyMarket.htokenI}
              hatomFarm={farm}
              userInfo={{ userRewards: userReward, deposits: userDeposits }}
            />
          );
        })}

      {hatomData.isLoading && (
        // skeleton

        <>
          <div className="w-full mt-10">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-36 bg-zinc-800 rounded w-full"></div>
              </div>
            </div>
          </div>
          <div className="w-full mt-10">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-36 bg-zinc-800 rounded w-full"></div>
              </div>
            </div>
          </div>

          <div className="w-full mt-10">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-36 bg-zinc-800 rounded w-full"></div>
              </div>
            </div>
          </div>
          <div className="w-full mt-10">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-36 bg-zinc-800 rounded w-full"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FarmsList;
