import axios from "axios";
const BASE_URL =
  (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000") + "/api";

const axiosDapfy = axios.create({
  baseURL: BASE_URL,
});

export default axiosDapfy;
