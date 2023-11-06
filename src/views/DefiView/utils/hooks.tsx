import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import useSwr from "swr";
import { selectisDepositModal, updateDepositModalState } from "./defi-slice";
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
    address ? ["hatomParentWsp:getUserTotalRewards"] : null,
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
    address ? ["hatomParentWsp:getDepositEntries"] : null,
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

export const useStake = (tokenI: string, more?: boolean) => {
  const dispatch = useAppDispatch();
  const modalsStakeState = useAppSelector(selectisDepositModal);
  const isOpenStake =
    modalsStakeState.find((modal) => modal.tokenI === tokenI)?.status || false;
  const onCloseStake = () => {
    dispatch(
      updateDepositModalState({
        status: false,
        tokenI,
      })
    );
  };
  const onOpenStake = () => {
    dispatch(
      updateDepositModalState({
        status: true,
        tokenI,
      })
    );
  };

  const handleStake = (e: any) => {
    e.stopPropagation();
    onOpenStake();
  };

  const StakeButton = (
    <Button className="w-full md:w-auto text-sm" onClick={handleStake}>
      {" "}
      Deposit {more ? "more" : ""}
    </Button>
  );

  return {
    isOpenStake,
    onCloseStake,
    onOpenStake,
    handleStake,
    StakeButton,
  };
};
