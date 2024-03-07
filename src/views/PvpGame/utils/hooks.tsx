import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
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
export const useGetUserActiveGames = () => {
  const address = useAppSelector(selectUserAddress);
  const { games, error, isLoading } = useGetActiveGames();

  const userGames = games.filter((game) => game.game?.user_creator === address);

  return {
    games: userGames,
    error,
    isLoading,
  };
};
