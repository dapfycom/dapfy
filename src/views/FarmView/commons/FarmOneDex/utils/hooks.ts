import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { useContext } from "react";
import useSwr from "swr";
import { OneDexFarmContext } from "../FarmOneDex";
import { fetchOneDexDepositEntries, fetchOneDexFarms } from "./services";

export const useGetOneDexFarms = () => {
  const { data, isLoading, error } = useSwr(
    "oneDexFarmWsp:getFarms",
    fetchOneDexFarms
  );

  return {
    farms: data || [],
    isLoading,
    error,
  };
};

export const useGetOneDexDepositEntries = () => {
  const { farm } = useContext(OneDexFarmContext);

  const address = useAppSelector(selectUserAddress);
  const { data, isLoading, error } = useSwr(
    farm
      ? ["oneDexFarmWsp:getTotalRewardsPerFarm", address, farm?.farm_click_id]
      : null,
    fetchOneDexDepositEntries
  );

  return {
    depositEntries: data,
    isLoading,
    error,
  };
};
