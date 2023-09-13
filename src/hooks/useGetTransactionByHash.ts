import { fetchTransactionByHash } from "services/rest/elrond/transactions";
import useSwr from "swr";
import { ITransacation } from "types/elrond.interface";
const useGetTransactionByHash = (hash: string) => {
  const { data, error, isLoading } = useSwr<ITransacation>(
    `/transactions/${hash}`,
    hash ? () => fetchTransactionByHash(hash) : null,
    {
      refreshInterval: (lastesData: ITransacation) => {
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
