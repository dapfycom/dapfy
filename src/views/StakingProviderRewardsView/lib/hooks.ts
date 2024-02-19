import { fetchElrondData } from "@/services/rest/elrond";
import BigNumber from "bignumber.js";
import useSWR from "swr";
import { fetchStakingProvidersTransactions } from "./functions";

export const useGetXStakingRewards = (address: string) => {
  const {
    data: providers,
    isLoading: isLoadingProviders,
    error: errorProviders,
  } = useSWR(
    address ? "/providers?withLatestInfo=false&fields=provider" : null,
    () => {
      return fetchElrondData<{ provider: string }[]>(
        "/providers?withLatestInfo=false&fields=provider"
      );
    }
  );

  const {
    data: transactionsData,
    isLoading: isLoadingTransactions,
    error: errorTransactions,
  } = useSWR(
    address
      ? "/providers/transactions?sender=" +
          address +
          "&receiver=" +
          providers?.join(",")
      : null,
    () => {
      return fetchStakingProvidersTransactions(
        providers?.map((p) => p.provider) || [],
        address
      );
    }
  );

  const totalRewards = (transactionsData || [])
    .reduce((acc, tx) => {
      if (!tx?.results) return acc;

      return new BigNumber(acc).plus(
        tx.results.reduce((acc2, txResult) => {
          return new BigNumber(acc2).plus(txResult.value);
        }, new BigNumber(0))
      );
    }, new BigNumber(0))
    .toString();

  return {
    rewards: totalRewards,
    transactions: transactionsData?.length,
    isLoading: isLoadingProviders || isLoadingTransactions,
    error: errorProviders || errorTransactions,
  };
};
