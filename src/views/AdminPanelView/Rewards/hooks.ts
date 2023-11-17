import { fetchLeaderboardPoints } from "@/services/rest/rewards/points";
import useSwr from "swr";
export const useGetRewardsLeaderboard = (date?: string) => {
  const { data, error, isLoading } = useSwr(
    ["rewards/points/leaderboard", date],
    () => fetchLeaderboardPoints(date)
  );

  return {
    leaderboard: data || [],
    error,
    isLoading,
  };
};
