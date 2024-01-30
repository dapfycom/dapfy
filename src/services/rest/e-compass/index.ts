import axios from "axios";
const BASE_URL = "https://e-compass.io/";

const axiosECompass = axios.create({
  baseURL: BASE_URL,
});

export default axiosECompass;

export const fetchECompass = async <T>(req: string): Promise<T> => {
  const res = await axiosECompass.get<T>(req);
  return res.data;
};
