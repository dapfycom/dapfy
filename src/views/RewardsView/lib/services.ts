import axiosDapfy from "@/services/rest/dapfy-api";
import { IUserX } from "@/types/rewards.interface";

export const syncXUserWithDapfyUser = async (data: IUserX, address: string) => {
  return axiosDapfy.post("/bind-user", {
    ...data,
    address,
  });
};
