import { fetchUserTwitterTask } from "@/services/rest/dapfy-api/task";
import { useSearchParams } from "next/navigation";
import useSwr from "swr";
export const useGetRewardsLeaderboard = () => {
  const params = useSearchParams();
  const date = params.get("date");
  const { data, error, isLoading } = useSwr(["tasks/all" + date], async () => {
    return await fetchUserTwitterTask(date || undefined);
  });

  return {
    leaderboard: data || [],
    error,
    isLoading,
  };
};
