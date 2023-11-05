import axios from "axios";
export const REWARDS_BASE_URL = process.env.NEXT_REWARDS_URL;

const axiosRewards = axios.create({
  baseURL: REWARDS_BASE_URL,
});

export default axiosRewards;
