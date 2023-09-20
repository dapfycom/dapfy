import {
  IElrondAccountToken,
  IElrondNFT,
  IElrondUserAccount,
} from "@/types/elrond.interface";
import axiosElrond from ".";

export const fetchAccountTokenById = async ([identifier, address]: [
  string,
  string
]): Promise<IElrondAccountToken> => {
  const res = await axiosElrond.get<IElrondAccountToken>(
    `/accounts/${address}/tokens/${identifier}`
  );
  return res.data;
};
export const fetchUserEgldBalance = async (
  address: string
): Promise<IElrondUserAccount> => {
  const res = await axiosElrond.get<IElrondUserAccount>(
    `/accounts/${address}?fields=balance`
  );
  return res.data;
};

export const fetchUserNfts = async ({
  address,
  parameters,
}: {
  address: string;
  parameters?: {
    collections?: string;
    size?: number;
  };
}) => {
  const res = await axiosElrond.get<IElrondNFT[]>(`/accounts/${address}/nfts`, {
    params: {
      size: parameters?.size || 1000,
      ...parameters,
    },
  });
  return res.data;
};
