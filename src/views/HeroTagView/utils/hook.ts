import axiosDapfy from "@/services/rest/dapfy-api";
import { useDebounce } from "@multiversx/sdk-dapp/hooks";
import useSWR from "swr";

export const useGetHeroTagAvailability = (herotag: string) => {
  const debouncedherotag = useDebounce(herotag, 500);
  const { data, error, isLoading } = useSWR(
    debouncedherotag ? `herotag-info/${debouncedherotag}` : null,
    async (url) => {
      const data = await axiosDapfy.post<{
        data?: string;
        dnsAddress?: string;
        error: boolean | string;
      }>("/herotag-info", {
        debouncedherotag,
      });

      return data.data;
    }
  );

  return { herotagInfo: data, error, isLoading };
};
