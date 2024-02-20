import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { fetchTransfers } from "@/services/rest/elrond/transactions";
import useSWR from "swr";

export const useGetPayments = () => {
  const address = useAppSelector(selectUserAddress);

  const { data, isLoading, error } = useSWR(
    `/api/payments?address=${address}`,
    async () => {
      return fetchTransfers({
        receiver: address,
        size: 10000,
      });
    }
  );

  return {
    payments: data || [],
    isLoading,
    error,
  };
};
