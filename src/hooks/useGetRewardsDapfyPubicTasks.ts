import { fetchAxiosDapfy } from "@/services/rest/dapfy-api";
import { IUserTasks } from "@/types/rewards.interface";
import useSWR from "swr";

const useGetRewardsDapfyPubicTasks = () => {
  const { data, error, isLoading } = useSWR<IUserTasks[]>(
    "/task",
    fetchAxiosDapfy
  );

  return {
    tasks: data,
    isLoading,
    error,
  };
};

export default useGetRewardsDapfyPubicTasks;
