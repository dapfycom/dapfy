"use client";
import {
  useGetHatomConfigs,
  useGetTvl,
  useGetUserInfo,
} from "../../utils/hooks";
import FarmComponent from "../DefiComponent/DefiComponent";

const FarmsList = () => {
  // const hatomData = useGetHatomFarms();
  const userHatomData = useGetUserInfo();
  const hatomData = useGetTvl();
  const configs = useGetHatomConfigs();

  return (
    <div className="w-full flex flex-col gap-16 mt">
      {hatomData.tlvs.map((farm) => {
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
    </div>
  );
};

export default FarmsList;
