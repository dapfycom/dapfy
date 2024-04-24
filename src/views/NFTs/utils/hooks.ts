import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { fetchScSimpleData } from "@/services/sc/queries";
import { adaptTokenPayment } from "@/utils/functions/adapters";
import { Address, AddressValue } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import useSWR from "swr";

export const useGetNFTsPrice = () => {
  const { data, error, mutate } = useSWR(
    "mintJeeterWsp:getNftPrice",
    async (key) => adaptTokenPayment(await fetchScSimpleData(key))
  );

  return {
    data: data || {
      amount: 0,
      token_identifier: "",
      token_nonce: 0,
    },
    error,
    mutate,
  };
};

export const useGetMaxAllowedToMint = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "mintJeeterWsp:getTokensLimitPerAddressTotal",
    async (key) => {
      const res: BigNumber = await fetchScSimpleData(key);

      return res.toNumber();
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetUserMinted = () => {
  const address = useAppSelector(selectUserAddress);

  const { data, error, isLoading, mutate } = useSWR(
    "mintJeeterWsp:getMintedPerAddressTotal:" + address,
    async (key) => {
      const res: BigNumber = await fetchScSimpleData(key, [
        new AddressValue(Address.fromBech32(address)),
      ]);
      return res.toNumber();
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useGetMaxUserAllowedToBuy = () => {
  const {
    data: limitPerAddress,
    error: errorLimitPerAddress,
    isLoading: isLoadingLimitPerAddress,
  } = useGetMaxAllowedToMint();
  const { data: mintedPerAddress, error, isLoading } = useGetUserMinted();

  return {
    tokensLeftToMint: (limitPerAddress || 0) - (mintedPerAddress || 0),
    error: errorLimitPerAddress || error,
    isLoading: isLoadingLimitPerAddress || isLoading,
  };
};

export const useGetLeftToMint = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "mintJeeterWsp:getTotalTokensLeft",
    async () => {
      const res: BigNumber = await fetchScSimpleData(
        "mintJeeterWsp:getTotalTokensLeft"
      );
      return res.toNumber();
    }
  );

  return {
    data: data || 0,
    error,
    isLoading,
    mutate,
  };
};
