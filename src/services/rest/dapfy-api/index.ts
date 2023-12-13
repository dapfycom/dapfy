import axios from "axios";
const BASE_URL =
  (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000") + "/api";

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

export default axiosDapfy;
