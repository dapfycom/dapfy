import { IUserToReward } from "@/types/rewards.interface";
import { format } from "date-fns";
import axiosDapfy from ".";

export const fetchUserTwitterTask = async (
  date: string = format(new Date(), "yyyy-LL-dd")
) => {
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
