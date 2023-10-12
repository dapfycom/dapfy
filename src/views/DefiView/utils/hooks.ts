import useSwr from "swr";
import { fetchHatomMoneyMarkets } from "./services";
export const useGetHatomFarms = () => {
  const { data, isLoading, error } = useSwr(
    ["hatomParentWsp:getMoneyMarkets"],
    fetchHatomMoneyMarkets
  );

  return {
    data: data || [],
    isLoading,
    error,
  };
};
