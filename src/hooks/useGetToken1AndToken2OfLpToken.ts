import { selectedNetwork } from "config/network";
import useGetMaiarPairs from "./useGetMaiarPairs";

const useGetToken1AndToken2OfLpToken = (lpToken: string, token1: string) => {
  const { pairs, isLoading, error } = useGetMaiarPairs();
  let tokenA = token1;
  if (tokenA === selectedNetwork.tokensID.egld) {
    tokenA = selectedNetwork.tokensID.wegld;
  }

  const pair = pairs?.find((p) => p.id === lpToken);
  let tokenB = pair?.baseId === token1 ? pair?.quoteId : pair?.baseId;

  return {
    token1: tokenA,
    token2: tokenB,
    isLoading,
    error,
  };
};

export default useGetToken1AndToken2OfLpToken;
