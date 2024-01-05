import axios from "axios";
const BASE_URL = "https://maiartokens.com";

const axiosMaiarTokens = axios.create({
  baseURL: BASE_URL,
});

export default axiosMaiarTokens;

export const fetchMaiarTokens = async <T>(req: string): Promise<T> => {
  const res = await axiosMaiarTokens.get<T>(req);
  return res.data;
};
