import useSwr from "swr";
import { fetchOneDexFarms } from "./services";

export const useGetAshSwapFarms = () => {
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
