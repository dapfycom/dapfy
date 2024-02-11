import { IUserToReward } from "@/types/rewards.interface";
import { format } from "date-fns";
import axiosDapfy from ".";

const today = format(new Date(), "yyyy-MM-dd");

export const fetchUserTwitterTask = async (date?: string) => {
  const { data } = await axiosDapfy.get<{
    users: IUserToReward[];
    current: boolean;
  }>("task/all", {
    params: {
      date: today === date ? undefined : date,
    },
  });

  return data || [];
};
