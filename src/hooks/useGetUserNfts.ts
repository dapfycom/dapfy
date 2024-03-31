import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { fetchUserNfts } from "@/services/rest/elrond/accounts";
import useSWR from "swr";
import { useAppSelector } from "./useRedux";

const useGetUserNfts = (collections?: string | null) => {
  const address = useAppSelector(selectUserAddress);
  const { data, error } = useSWR(
    address && collections !== null
      ? {
          address: address,
          parameters: { collections: collections },
        }
      : null,
    fetchUserNfts,
    {}
  );

  return {
    nfts: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export default useGetUserNfts;
