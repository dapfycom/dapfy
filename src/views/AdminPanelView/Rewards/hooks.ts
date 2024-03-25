import useGetRewardsDapfyPubicTasks from "@/hooks/useGetRewardsDapfyPubicTasks";
import { fetchAxiosDapfy } from "@/services/rest/dapfy-api";
import { fetchUserTwitterTask } from "@/services/rest/dapfy-api/task";
import { useSearchParams } from "next/navigation";
import useSwr from "swr";
export const useGetRewardsLeaderboard = () => {
  const params = useSearchParams();
  const date = params.get("date");
  const { data, error, isLoading } = useSwr(["tasks/all" + date], async () => {
    return await fetchUserTwitterTask(date || undefined);
  });

  return {
    leaderboard: data?.users || [],
    current: data?.current,
    error,
    isLoading,
  };
};

export const useGetBlackListUsers = () => {
  const { data, error, isLoading } = useSwr<{
    users: {
      username: string;
      xid: string;
      id: string;
    }[];
  }>("/xuser/blacklist", fetchAxiosDapfy);

  return {
    users: data?.users || [],
    error,
    isLoading,
  };
};

export const useGetPublicUserTasks = (id: string) => {
  const { tasks, error, isLoading } = useGetRewardsDapfyPubicTasks();
  console.log("tasks", tasks);

  const userTasks = tasks?.find((t) => t.user_id === id);

  return {
    userTasks,
    error,
    isLoading,
  };
};
