import { IUserPoints } from "@/types/rewards.interface";
import axios from "axios";
import axiosRewards, { fakeData } from ".";
export const fetchLeaderboardPoints = async (date?: string) => {
  console.log("date", date);

  if (fakeData) {
    const { data } = await axios.get<{ leaderboard: IUserPoints[] }>(
      "http://localhost:5000/points",
      {
        params: {
          date: date,
        },
        withCredentials: true,
      }
    );

    return data.leaderboard;
  }
  const { data } = await axiosRewards.get<IUserPoints[]>("points/leaderboard", {
    params: {
      date: date,
    },
    withCredentials: true,
  });

  // console.log(data);

  return data;
};
