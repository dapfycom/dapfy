import { selectedNetwork } from "@/config/network";
import { useGetMvxEpoch } from "@/hooks/useGetStats";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useGetXUser } from "@/hooks/useXAuthentication";
import { selectUserAddress, setIsStreakModal } from "@/redux/dapp/dapp-slice";
import { getUserEmailsReport } from "@/services/rest/dapfy-api/rewards-report";
import { fetchIsUserUsedDapfyTool } from "@/services/rest/dapfy-api/use-sc-tool";
import { fetchTransactions } from "@/services/rest/elrond/transactions";
import {
  fetchRewardsPoints,
  fetchUserTask,
} from "@/services/rest/rewards/user";
import { fetchScSimpleData } from "@/services/sc/queries";
import { IUserX } from "@/types/rewards.interface";
import { generateHash } from "@/utils/functions/crypto";
import { Address, AddressValue } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import { getCookie, setCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import useSWR from "swr";
import {
  fetchHasClaimedRewards,
  fetchUnCollectedRewards,
  fetchUsersAvatars,
  syncXUserWithDapfyUser,
} from "./services";

export const useGetUserPoints = () => {
  const { user } = useGetXUser();
  const { data, error, isLoading } = useSWR(
    user ? `/points/${user.id}` : null,
    fetchRewardsPoints
  );

  return {
    rewards: data,
    isLoading,
    error,
  };
};
export const useGetUserTasks = () => {
  const { user } = useGetXUser();
  const { data, error, isLoading } = useSWR(
    user ? `/tasks/${user.id}` : null,
    fetchUserTask
  );

  return {
    tasks: data,
    isLoading,
    error,
  };
};

export const useBindXUserWithDapfyUser = () => {
  const address = useAppSelector(selectUserAddress);
  const { user } = useGetXUser();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const callUpdateUser = useRef(0);

  useEffect(() => {
    const bindUser = async (user: IUserX, address: string) => {
      try {
        await syncXUserWithDapfyUser(user, address);
        callUpdateUser.current++;
        // window.location.href =
        //   process.env.NEXT_PUBLIC_BASE_URL + routeNames.rewards;
      } catch (error) {
        console.log(error);
      }
    };
    if (
      address &&
      status === "success" &&
      user &&
      callUpdateUser.current === 0
    ) {
      bindUser(user, address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, address, user?.id]);
};

export const useGetIsUserInteractedDefiTool = () => {
  const address = useAppSelector(selectUserAddress);
  const { nextEpoch, previousEpoch } = useGetMvxEpoch();

  const { data, error, isLoading } = useSWR(
    address && previousEpoch && nextEpoch
      ? `/use-sc-tool/${address}/${previousEpoch.getMinutes()}/${nextEpoch.getMinutes()}`
      : null,
    async () => {
      return fetchIsUserUsedDapfyTool({
        address: address,
        from: previousEpoch!.toISOString(),
        to: nextEpoch!.toISOString(),
      });
    }
  );

  return {
    isUserInteractedDefiTool: data?.data,
    isLoading,
    error,
  };
};

export const useGetUserEmailReport = () => {
  const { user } = useGetXUser();
  const { data, error, isLoading, mutate } = useSWR(
    user ? `/email-report/${user.id}` : null,
    () => {
      return getUserEmailsReport(user?.id!);
    }
  );

  return {
    emailReport: data?.reports || [],
    mutate,
    isLoading,
    error,
  };
};

export const useGetUsersAvatars = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/x-users-avatars",
    fetchUsersAvatars
  );
  return {
    avatars: data?.data?.usersAvatars || [],
    mutate,
    isLoading,
    error,
  };
};

export const useGetUnCollectedRewards = () => {
  const address = useAppSelector(selectUserAddress);
  const { data, error, isLoading, mutate } = useSWR(
    address ? "rewardsWsp:getUserClaimable" + address : null,
    async () => {
      return fetchUnCollectedRewards(address);
    }
  );
  return {
    rewards: data || "0",
    mutate,
    isLoading,
    error,
  };
};
export const useGetHasClaimedRewards = () => {
  const address = useAppSelector(selectUserAddress);
  const { data, error, isLoading, mutate } = useSWR(
    address ? "rewardsWsp:hasClaimed" + address : null,
    async () => {
      return fetchHasClaimedRewards();
    }
  );
  return {
    hasClaimed: data,
    mutate,
    isLoading,
    error,
  };
};

export const useGetStreak = () => {
  const address = useAppSelector(selectUserAddress);
  const { data, error, isLoading, mutate } = useSWR(
    address ? "rewardsWsp:getUserStrike" + address : null,
    async () => {
      return fetchScSimpleData("rewardsWsp:getUserStrike", [
        new AddressValue(new Address(address)),
      ]);
    }
  );
  return {
    userStreak: data ? new BigNumber(data as BigNumber).toNumber() : 0,
    mutate,
    isLoading,
    error,
  };
};

export const useGetAllTimeEarned = () => {
  const address = useAppSelector(selectUserAddress);
  const { data, error, isLoading, mutate } = useSWR(
    address ? `/all-time-earned/${address}` : null,
    async () => {
      return fetchTransactions({
        sender: address,
        receiver: selectedNetwork.scAddress.rewards,
        function: "claim",
        withScResults: true,
      });
    }
  );
  // const {
  //   data: userEarned,
  //   error: userEarnedError,
  //   isLoading: userEarnedLoading,
  // } = useSWR<BigNumber>(
  //   address ? `rewardsWsp:getUserEarned:${address}` : null,
  //   async () => {
  //     return fetchScSimpleData("rewardsWsp:getUserEarned", [
  //       new AddressValue(new Address(address)),
  //     ]);
  //   }
  // );
  // console.log({ userEarned: userEarned.toString() });

  const txData = data || [];
  const earned = txData
    .reduce((acc, tx) => {
      if (!tx?.results) return acc;

      return new BigNumber(acc).plus(
        tx.results.reduce((acc2, txResult) => {
          console.log({ txResult });

          return new BigNumber(acc2).plus(txResult.value);
        }, new BigNumber(0))
      );
    }, new BigNumber(0))
    .toString();

  return {
    allTimeEarned: earned,
    mutate,
    isLoading,
    error,
  };
};

export const useStreakDialog = () => {
  const address = useAppSelector(selectUserAddress);
  const { userStreak, error, isLoading } = useGetStreak();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      address &&
      (userStreak === 1 ||
        userStreak === 7 ||
        userStreak === 14 ||
        userStreak === 30)
    ) {
      const hash = generateHash(address + userStreak);

      // get cookie value of hash
      const cookieHash = getCookie("streak-hash");

      if (cookieHash !== hash) {
        setCookie("streak-hash", hash, {
          maxAge: 60 * 60 * 24 * 365, // 1 year
        });

        dispatch(setIsStreakModal(true));
      }
    }
  }, [userStreak, address, dispatch]);
};
