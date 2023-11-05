import axios from "axios";
export const REWARDS_BASE_URL =
  process.env.NEXT_REWARDS_URL || "https://2ljwpg29-4000.use2.devtunnels.ms/";

const axiosRewards = axios.create({
  baseURL: REWARDS_BASE_URL,
});

export default axiosRewards;
