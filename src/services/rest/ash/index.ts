import axios from "axios";
import { selectedSwapConfig } from "./ashConfig";
const BASE_URL =
  process.env.NEXT_PUBLIC_ASHSWAP_API_URL || selectedSwapConfig.apiUrl;

const axiosAshswap = axios.create({
  baseURL: BASE_URL,
});

export default axiosAshswap;

export const fetchAggregatorData = async <T>(req: string): Promise<T> => {
  const res = await axiosAshswap.get<T>(req);
  return res.data;
};
