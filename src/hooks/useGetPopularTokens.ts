import useGetMaiarPairs from "./useGetMaiarPairs";
import useGetOneDexTokens from "./useGetOneDexTokens";

const useFilterPopularTokens = (tokens: string[]) => {
  const { pairs, isLoading, error } = useGetMaiarPairs();
  const oneDexTokens = useGetOneDexTokens();

  const popularTokens = tokens.filter(
    (token) =>
      pairs.some((pair) => pair.baseId === token || pair.quoteId === token) ||
      oneDexTokens.includes(token)
  );
  return {
    popularTokens: popularTokens || [],
    isLoading,
    error,
  };
};

export default useFilterPopularTokens;
