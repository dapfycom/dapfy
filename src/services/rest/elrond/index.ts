import { selectedNetwork } from "@/config/network";
import axios from "axios";
const BASE_URL =
  process.env.REACT_APP_ELROND_CUSTOM_API || selectedNetwork.network.apiAddress;

const axiosElrond = axios.create({
  baseURL: BASE_URL,
});

export default axiosElrond;

export const MvxApiBaseUrl = BASE_URL;

export const fetchElrondData = async <T>(req: string): Promise<T> => {
  const res = await axiosElrond.get<T>(req);
  return res.data;
};
