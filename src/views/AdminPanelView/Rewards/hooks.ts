import { fetchLeaderboardPoints } from "@/services/rest/rewards/points";
import { useSearchParams } from "next/navigation";
import useSwr from "swr";
export const useGetRewardsLeaderboard = () => {
  const params = useSearchParams();
  const date = params.get("date");
  const { data, error, isLoading } = useSwr(
    ["rewards/points/leaderboard" + date],
    () => fetchLeaderboardPoints(date!)
  );

  return {
    leaderboard: data || [],
    error,
    isLoading,
  };
};
