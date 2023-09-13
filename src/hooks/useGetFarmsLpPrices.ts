import useGetMaiarPairs from "./useGetMaiarPairs";
//hook for getting the price of LP tokens in USD

export const useGetFarmsLpPrices = () => {
  const { pairs, isLoading, error } = useGetMaiarPairs();
  const finalData = pairs?.map((item) => {
    return {
      token: item.id,
      price: item.price,
    };
  });
  return {
    prices: finalData || [],
    isLoading,
    error: error,
  };
};
