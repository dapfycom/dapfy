import axiosDapfy from "@/services/rest/dapfy-api";
import { scQuery } from "@/services/sc/queries";
import { IUserX } from "@/types/rewards.interface";
import { Address } from "@multiversx/sdk-core/out";

export const syncXUserWithDapfyUser = async (data: IUserX, address: string) => {
  return axiosDapfy.post("/bind-user", {
    ...data,
    address,
  });
};

export const fetchUsersAvatars = async () => {
  return await axiosDapfy.get<{
    usersAvatars: { profile_image_url: string }[];
  }>("/x-users-avatars");
};

export const fetchUnCollectedRewards = async (
  address: string
): Promise<string> => {
  const res = await scQuery("rewardsWsp", "getUserClaimable", [
    new Address(address),
  ]);

  const res2 = await scQuery("rewardsWsp", "getSupplyAmount");
  console.log({ supply: res2.firstValue?.valueOf().toString() });

  const value = res.firstValue?.valueOf().toString();
  console.log({ value });

  return (res.firstValue?.valueOf().toString() as string) || "0";
};
