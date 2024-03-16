import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { fetchAxiosDapfy } from "@/services/rest/dapfy-api";
import useSWR from "swr";
import { useAppSelector } from "./useRedux";

const useGetXMinimalInfo = () => {
  const address = useAppSelector(selectUserAddress);
  const { data, error, isLoading } = useSWR(
    "/xuser/address/" + address,
    fetchAxiosDapfy<{
      message: string;
      user: {
        username: string;
        profile_image_url: string;
      };
    }>
  );

  return {
    user: data?.user,
    error,
    isLoading,
  };
};

export default useGetXMinimalInfo;
