import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { useContext } from "react";
import useSwr from "swr";
import { AshFarmContext } from "../FarmAshSwap";
import { fetchAshSwapDepositEntries, fetchAshSwapFarms } from "./services";

export const useGetAshSwapFarms = () => {
  const { data, isLoading, error } = useSwr(
    "ashSwapFarmWsp:getFarms",
    fetchAshSwapFarms
  );

  return {
    farms: data || [],
    isLoading,
    error,
  };
};
export const useGetAshSwapDepositEntries = () => {
  const { farm } = useContext(AshFarmContext);

  const address = useAppSelector(selectUserAddress);
  const { data, isLoading, error } = useSwr(
    farm
      ? ["ashSwapFarmWsp:getTotalRewardsPerFarm", address, farm?.farm_click_id]
      : null,
    fetchAshSwapDepositEntries
  );

  return {
    depositEntries: data,
    isLoading,
    error,
  };
};
