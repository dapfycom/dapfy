import axios from "axios";
const BASE_URL =
  (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000") + "/api";

export const serverAxiosDapfy = axios.create({
  baseURL: BASE_URL,
});
const axiosDapfy = axios.create({
  baseURL: BASE_URL,
});

// add barear token to all requests from localStorage
axiosDapfy.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchAxiosDapfy = async <T>(req: string): Promise<T> => {
  const res = await axiosDapfy.get<T>(req);
  return res.data;
};

export default axiosDapfy;
