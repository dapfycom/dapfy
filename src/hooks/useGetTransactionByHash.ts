import { fetchTransactionByHash } from "@/services/rest/elrond/transactions";
import { ITransacation } from "@/types/elrond.interface";
import useSwr from "swr";
const useGetTransactionByHash = (hash: string) => {
  const { data, error, isLoading } = useSwr<ITransacation>(
    hash ? `/transactions/${hash}` : null,
    () => fetchTransactionByHash(hash),
    {
      refreshInterval: (lastesData) => {
        let timeRefresh = 0;

        if (lastesData?.status === "pending") {
          timeRefresh = 2000;
        }
        return timeRefresh;
      },
    }
  );

  return {
    transaction: data,
    error,
    isLoading,
  };
};

export default useGetTransactionByHash;
