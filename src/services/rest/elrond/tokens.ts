import { IElrondToken } from "@/types/elrond.interface";
import axiosElrond from ".";

export const fetchTokenById = async (
  identifier: string
): Promise<IElrondToken> => {
  const res = await axiosElrond.get<IElrondToken>(`/tokens/${identifier}`);
  return res.data;
};

export const getFromAllTokens = async ([
  ,
  {
    size = 10000,
    name = undefined,
    identifier = undefined,
    identifiers = undefined,
    search = undefined,
  },
]) => {
  return await axiosElrond.get<IElrondToken[]>("/tokens", {
    params: {
      identifier,
      identifiers,
      name,
      size,
      search,
    },
  });
};

export const getTokens = async (address: string, size?: number) => {
  return await axiosElrond.get(
    `/accounts/${address}/tokens?size=${size || 200}`
  );
};
