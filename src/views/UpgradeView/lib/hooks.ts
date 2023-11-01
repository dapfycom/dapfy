import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import axiosDapfy from "@/services/rest/dapfy-api";
import { IPurchase } from "@/types/upgrade.interface";
import useSWR from "swr";

export const useGetPurchaseData = () => {
  const address = useAppSelector(selectUserAddress);

  const { data, error, isLoading } = useSWR(
    address ? "/purchases?address=" + address : null,
    async (url) => {
      const res = await axiosDapfy.get<{
        history: IPurchase[];
      }>(url);

      return res.data;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      revalidateIfStale: false,
    }
  );

  return { purchases: data?.history || [], error, isLoading };
};
