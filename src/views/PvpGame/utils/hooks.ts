import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import useSWR from "swr";
import { fetchActiveGames, fetchGamesHistory, fetchScStats } from "./services";

export const useGetActiveGames = () => {
  const { data, error, isLoading } = useSWR(
    "pvpWsp:getActiveGames",
    fetchActiveGames
  );
  const games = data || [];
  const displayGames = games.sort((a, b) => {
    if (a.game?.date && b.game?.date) {
      return b.game.date - a.game.date;
    } else {
      return 0;
    }
  });

  return {
    games: displayGames,
    error,
    isLoading,
  };
};

export const useStatsGAmes = () => {
  const { data, error, isLoading } = useSWR<{
    gamesPlayed: number;
    volume: { token: string; amount: number }[];
    total_users: number;
  }>("pvpWsp:getStats", fetchScStats);
  console.log({ data });

  return {
    stats: data || {
      gamesPlayed: 0,
      volume: [],
      total_users: 0,
    },
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

export const useGetGamesHistory = () => {
  const { data, error, isLoading } = useSWR(
    "pvpWsp:getGamesHistory",
    fetchGamesHistory
  );
  const games = data || [];
  const displayGames = games.sort((a, b) => {
    if (a.date && b.date) {
      return b.date - a.date;
    } else {
      return 0;
    }
  });

  return {
    history: displayGames,
    error,
    isLoading,
  };
};

export const useGetUserGamesHistory = () => {
  const address = useAppSelector(selectUserAddress);

  const { history, error, isLoading } = useGetGamesHistory();

  const userGames = history.filter(
    (game) =>
      game.creator.address === address || game.challenger.address === address
  );

  return {
    history: userGames,
    error,
    isLoading,
  };
};
