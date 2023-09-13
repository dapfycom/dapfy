import { selectedNetwork } from "config/network";
import useGetMaiarPairs from "./useGetMaiarPairs";
export const useGetAllMaiarListedTokens = () => {
  const { pairs, error, isLoading } = useGetMaiarPairs();
  const maiarTokens: string[] = pairs.map((pair) => {
    if (pair.baseId === "USDC-c76f1f") {
      return pair.quoteId;
    } else {
      return pair.baseId;
    }
  });
  maiarTokens.push(selectedNetwork.tokensID.usdc);
  return {
    maiarTokens: maiarTokens || [],
    error,
    isLoading,
  };
};
