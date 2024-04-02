import useGetUserNfts from "@/hooks/useGetUserNfts";
import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { fetchScSimpleData } from "@/services/sc/queries";
import { Address, AddressValue } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import useSWR from "swr";
export const useGetNftsStakedInfo = () => {
  const { data } = useSWR<{
    nfts_staked: BigNumber;
    rewards_tokens: any[];
    total_users: BigNumber;
  }>("mintingStakingNftWsp:getStakingInfo", fetchScSimpleData);

  return {
    totalUsers: data?.total_users.toNumber() || 0,
    totalRewarded: data?.rewards_tokens || [],
    totalNftsStaked: data?.nfts_staked.toNumber() || 0,
  };
};

export const useGetUserInfo = () => {
  const address = useAppSelector(selectUserAddress);

  const { data, isLoading, error } = useSWR<{
    user_nfts: {
      nonce: BigNumber;
      nft_collection: string;
      owner: Address;
    }[];
    rewards_tokens: {
      token_identifier: string;
      amount: BigNumber;
    }[];
  }>(
    address ? "mintingStakingNftWsp:getUserStakingInfo:" + address : null,
    () =>
      fetchScSimpleData("mintingStakingNftWsp:getUserStakingInfo", [
        new AddressValue(Address.fromBech32(address)),
      ])
  );

  return {
    userNfts:
      data?.user_nfts.map((nft) => ({
        nonce: nft.nonce.toNumber(),
        collection: nft.nft_collection,
        owner: nft.owner.bech32(),
      })) || [],
    rewardsTokens:
      data?.rewards_tokens.map((token) => ({
        identifier: token.token_identifier,
        amount: token.amount.toString(),
      })) || [],
  };
};

export const useGetSftCollection = () => {
  const { data, error, isLoading } = useSWR<string>(
    "mintingStakingNftWsp:getNftTokenId",
    fetchScSimpleData
  );

  return {
    sftCollection: data || "",
    isLoading,
    error,
  };
};

export const useGetUserSfts = () => {
  const { sftCollection } = useGetSftCollection();
  const { nfts } = useGetUserNfts(sftCollection ? sftCollection : null);

  return {
    nfts: nfts || [],
  };
};
