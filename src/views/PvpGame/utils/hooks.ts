import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import BigNumber from "bignumber.js";
import { useState } from "react";
import useSWR from "swr";
import {
  fetchActiveGames,
  fetchGamesHistory,
  fetchMinAmounts,
  fetchScStats,
  fetchUserEarnings,
} from "./services";
export const useGetActiveGames = () => {
  const { data, error, isLoading } = useSWR(
    "pvpWsp:getActiveGames",
    fetchActiveGames
  );
  const games = data || [];
  const displayGames = games.sort((a, b) => {
    if (a.game?.amount && b.game?.amount) {
      return new BigNumber(b.game.amount).minus(a.game.amount).toNumber();
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

export const useGetMinimalAmount = (tokenIdentifier: string) => {
  const { data, error, isLoading } = useSWR(
    "pvpWsp:getMinAmounts",
    fetchMinAmounts
  );
  const gamePayments = data || [];

  return {
    minAmount: gamePayments.find((p) => p.token_identifier === tokenIdentifier),
    error,
    isLoading,
  };
};

export const useFilterGames = () => {
  const [filterOptions, setFilterOptions] = useState<{
    name: "bigger" | "smaller" | "equal";
    value: string;
    token?: string;
  }>();
  const { games, isLoading, error } = useGetActiveGames();

  const filterGames = games.filter((game) => {
    if (!filterOptions) return true;
    const amount = new BigNumber(game.game?.amount || 0);
    if (filterOptions.token) {
      if (filterOptions.name === "bigger") {
        return (
          amount.isGreaterThanOrEqualTo(filterOptions.value) &&
          game.game?.token_identifier === filterOptions.token
        );
      } else if (filterOptions.name === "smaller") {
        return (
          amount.isLessThanOrEqualTo(filterOptions.value) &&
          game.game?.token_identifier === filterOptions.token
        );
      } else {
        return (
          amount.isEqualTo(filterOptions.value) &&
          game.game?.token_identifier === filterOptions.token
        );
      }
    } else {
      if (filterOptions.name === "bigger") {
        return amount.isGreaterThanOrEqualTo(filterOptions.value);
      } else if (filterOptions.name === "smaller") {
        return amount.isLessThanOrEqualTo(filterOptions.value);
      } else {
        return amount.isEqualTo(filterOptions.value);
      }
    }
  });

  const handleFilter = (
    name: "bigger" | "smaller" | "equal",
    value: string,
    token?: string
  ) => {
    setFilterOptions({ name, value, token });
  };

  const clearFilter = () => {
    setFilterOptions(undefined);
  };

  return {
    games: filterGames,
    handleFilter,
    filterOptions,
    clearFilter,
    isLoading,
    error,
  };
};

export const useGetUserEarnings = () => {
  const address = useAppSelector(selectUserAddress);
  const { data, error, isLoading } = useSWR<string>(
    address ? "pvpWsp:getUserEarnings" : null,
    () => fetchUserEarnings(address)
  );
  return {
    earnings: data || "0",
    error,
    isLoading,
  };
};
