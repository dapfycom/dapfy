import axiosDapfy from "@/services/rest/dapfy-api";
import useSWR from "swr";

export const useGetXFees = (address: string) => {
  const { data, isLoading, error } = useSWR(
    address ? [`/api/x-fees`, address] : null,
    () => {
      return axiosDapfy.post<{
        xfees: string;
        transactions: number;
      }>(`/x-fees`, {
        address,
      });
    }
  );

  return {
    xfees: data?.data,
    isLoading,
    error,
  };
};
