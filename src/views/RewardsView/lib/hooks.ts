import { useGetMvxEpoch } from "@/hooks/useGetStats";
import { useAppSelector } from "@/hooks/useRedux";
import { useGetXUser } from "@/hooks/useXAuthentication";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { getUserEmailsReport } from "@/services/rest/dapfy-api/rewards-report";
import { fetchIsUserUsedDapfyTool } from "@/services/rest/dapfy-api/use-sc-tool";
import {
  fetchRewardsPoints,
  fetchUserTask,
} from "@/services/rest/rewards/user";
import { IUserX } from "@/types/rewards.interface";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import useSWR from "swr";
import { fetchUsersAvatars, syncXUserWithDapfyUser } from "./services";

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
