import useSWR from "swr";
import { fetchActiveGames } from "./services";

export const useGetActiveGames = () => {
  const { data, error, isLoading } = useSWR(
    "pvpWsp:getActiveGames",
    fetchActiveGames
  );

  return {
    games: data || [],
    error,
    isLoading,
  };
};
