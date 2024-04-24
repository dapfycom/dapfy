import axios from "axios";
export const REWARDS_BASE_URL = process.env.NEXT_PUBLIC_REWARDS_URL;

const axiosRewards = axios.create({
  baseURL: REWARDS_BASE_URL,
});

export default axiosRewards;

export const fakeData = process.env.NODE_ENV !== "production" && false;
