import axios from "axios";
const BASE_URL =
  process.env.NEXT_REWARDS_URL || "https://2ljwpg29-4000.use2.devtunnels.ms/";

const axiosRewards = axios.create({
  baseURL: BASE_URL,
});

export default axiosRewards;
