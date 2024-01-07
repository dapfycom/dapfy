import { useAppSelector } from "@/hooks/useRedux";
import { useGetXUser } from "@/hooks/useXAuthentication";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { fetchRewardsPoints } from "@/services/rest/rewards/user";
import { IUserX } from "@/types/rewards.interface";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import useSWR from "swr";
import { syncXUserWithDapfyUser } from "./services";

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
        console.log("success");

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
