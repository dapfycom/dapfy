import { IUserPoints } from "@/types/rewards.interface";
import axiosRewards, { fakeData } from ".";

export const fetchLeaderboardPoints = async (date?: string) => {
  if (fakeData) {
    const data = Promise.resolve([
      {
        username: "Beskar_Warriors",
        points: 75,
        _id: "655501ce2cd1780126de23c1",
      },
      {
        username: "ajx24",
        points: 10,
        _id: "655501ce2cd1780126de23b8",
      },
      {
        username: "Statt_eureka",
        points: 10,
        _id: "65552cc62f883e88a76d8cd8",
      },
      {
        username: "Yy36372207",
        points: 10,
        _id: "6555307f2f883e88a76d8dc3",
      },
      {
        username: "DapfyCom",
        points: 10,
        _id: "6555366e51947e5e03cb898a",
      },
    ]);

    return data;
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
