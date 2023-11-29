import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import BigNumber from "bignumber.js";
import useSwr from "swr";
import { fetchAshSwapFarms } from "./services";

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
