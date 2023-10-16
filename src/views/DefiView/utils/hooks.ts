import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import useSwr from "swr";
import {
  fetchHatomConfigs,
  fetchHatomMoneyMarkets,
  fetchUserDeposits,
  fetchUserTotalRewards,
  fetctTotalTvl,
} from "./services";
export const useGetHatomFarms = () => {
  const { data, isLoading, error } = useSwr(
    ["hatomParentWsp:getMoneyMarkets"],
    fetchHatomMoneyMarkets
  );

  return {
    data: data || [],
    isLoading,
    error,
  };
};

export const useGetUserTotalRewards = () => {
  const address = useAppSelector(selectUserAddress);
  const { data, error, isLoading } = useSwr(
    ["hatomParentWsp:getUserTotalRewards"],
    () => fetchUserTotalRewards(address)
  );

  return {
    rewards: data || [],
    error,
    isLoading,
  };
};

export const useGetUserDeposits = () => {
  const address = useAppSelector(selectUserAddress);
  const { data, error, isLoading } = useSwr(
    ["hatomParentWsp:getDepositEntries"],
    () => fetchUserDeposits(address)
  );

  return {
    deposits: data || [],
    error,
    isLoading,
  };
};

export const useGetTvl = () => {
  const { data, error, isLoading } = useSwr(
    "hatomParentWsp:getTvl",
    fetctTotalTvl
  );

  return {
    tlvs: data || [],
    error,
    isLoading,
  };
};

export const useGetUserInfo = () => {
  const {
    deposits,
    isLoading: isLoadingDeposits,
    error: errorDeposits,
  } = useGetUserDeposits();
  const {
    error: errorRewards,
    isLoading: isLoadingRewards,
    rewards,
  } = useGetUserTotalRewards();

  const isLoading = isLoadingDeposits || isLoadingRewards;
  const error = errorDeposits || errorRewards;

  return {
    deposits,
    rewards,
    isLoading,
    error,
  };
};

export const useGetHatomConfigs = () => {
  const { data, isLoading, error } = useSwr(
    ["hatomParentWsp:getConfigs"],
    fetchHatomConfigs
  );

  return {
    data: data || [],
    isLoading,
    error,
  };
};
