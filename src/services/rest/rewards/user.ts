import { IUserPoints, IUserX } from "@/types/rewards.interface";
import axiosRewards from ".";

const fakeData = process.env.NODE_ENV !== "production" && true;

export const fetchConnectedXUser = async (): Promise<IUserX> => {
  if (fakeData) {
    const data = Promise.resolve({
      username: "FrontendGuruJS",
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1647137175215980546/UpYb4849_normal.jpg",
      id: "1455420368986968067",
      name: "Armando Cesar",
    });

    return data;
  }
  const { data } = await axiosRewards.get<IUserX>("auth/user", {
    withCredentials: true,
  });

  // console.log(data);

  return data;
};

export const fetchRewardsPoints = async (url: string): Promise<IUserPoints> => {
  if (fakeData) {
    const data = Promise.resolve({
      _id: "60f3c5e7c9e0b40015a3e9b9",
      id: "1455420368986968067",
      username: "FrontendGuruJS",
      points: 0,
      __v: 0,
    });
    return data;
  }
  const { data } = await axiosRewards.get<IUserPoints>(url, {
    withCredentials: true,
  });

  // console.log(data);

  return data;
};
