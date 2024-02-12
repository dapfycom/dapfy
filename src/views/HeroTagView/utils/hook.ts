import { fetchElrondData } from "@/services/rest/elrond";
import { useDebounce } from "@multiversx/sdk-dapp/hooks";
import useSWR from "swr";

export const useGetHeroTagAvailability = (herotag: string) => {
  const debouncedherotag = useDebounce(herotag, 500);
  const { data, error, isLoading } = useSWR(
    debouncedherotag ? `herotag-info/${debouncedherotag}` : null,
    async (url) => {
      const data = await fetchElrondData<{
        address: string;
        balance: string;
        nonce: number;
        timestamp: number;
        shard: number;
        rootHash: string;
        username: string;
        developerReward: string;
        txCount: number;
        scrCount: number;
      }>(`usernames/${herotag}?withGuardianInfo=false`);

      return data;
    },
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (error.status === 404) return;
        if (error.message === "Network Error") return;
        if (retryCount >= 5) return;
        setTimeout(() => revalidate({ retryCount }), 10000);
      },
    }
  );

  return { herotagInfo: data, error, isLoading };
};
