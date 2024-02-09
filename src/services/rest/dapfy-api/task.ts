import { IUserToReward } from "@/types/rewards.interface";
import axiosDapfy from ".";

export const fetchUserTwitterTask = async (date?: string) => {
  const { data } = await axiosDapfy.get<{ users: IUserToReward[] }>(
    "task/all",
    {
      params: {
        date,
      },
    }
  );

  return data?.users || [];
};
