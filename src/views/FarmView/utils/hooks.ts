import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { fetchScSimpleData } from "@/services/sc/queries";
import { Address, AddressValue } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import useSwr from "swr";
import { calculateFarmReward } from "./functions";
import { fetchFarmInfo, fetchUserFarmInfo } from "./services";
export const useGetFarmUserInfo = () => {
  const address = useAppSelector(selectUserAddress);
  const { data, isLoading, error } = useSwr(
    ["bskFarmWsp:viewUserTokenData", address],
    fetchUserFarmInfo,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  return {
    data: data,
    isLoading,
    error,
  };
};
export const useGetFarmsInfo = () => {
  const { data, isLoading, error } = useSwr(
    "bskFarmWsp:viewAppTokenData",
    fetchFarmInfo
  );

  return {
    data: data,
    isLoading,
    error,
  };
};

export const useGetBskRewards = () => {
  const { data: userFarmInfo } = useGetFarmUserInfo();
  const { data: farmInfo } = useGetFarmsInfo();

  if (!userFarmInfo || !farmInfo) {
    return {
      earnedBsk: "0",
    };
  }
  const { perShareNft, perShareLp } = farmInfo;
  const { lpActive, userTokens, nftActive } = userFarmInfo;
  const { debtLp, debtNft, reward } = userTokens[0];

  const earnedBsk: string = calculateFarmReward(
    reward,
    lpActive,
    perShareLp[0],
    debtLp,
    nftActive.length,
    perShareNft[0],
    debtNft
  );

  return {
    earnedBsk: !userFarmInfo || !farmInfo ? "0" : earnedBsk,
  };
};

export const useLpStoped = () => {
  const { data: userFarmInfo } = useGetFarmUserInfo();
  const { data: farmInfo } = useGetFarmsInfo();

  const bnLpStoped = new BigNumber(userFarmInfo?.lpStopped || 0);
  const bnUserBlock = new BigNumber(userFarmInfo?.lock || 0);
  const bnCurrentBlock = new BigNumber(farmInfo?.block || 0);
  const isLpStoped = !(
    bnLpStoped.isGreaterThan(0) &&
    bnUserBlock.isLessThanOrEqualTo(bnCurrentBlock)
  );

  return {
    isLpStoped: isLpStoped,
  };
};
export const useNFTsStoped = () => {
  const { data: userFarmInfo } = useGetFarmUserInfo();
  const { data: farmInfo } = useGetFarmsInfo();

  const bnLpStoped = new BigNumber(userFarmInfo?.nftStopped.length || 0);
  const bnUserBlock = new BigNumber(userFarmInfo?.lock || 0);
  const bnCurrentBlock = new BigNumber(farmInfo?.block || 0);
  const isNFTsStoped = !(
    bnLpStoped.isGreaterThan(0) &&
    bnUserBlock.isLessThanOrEqualTo(bnCurrentBlock)
  );

  return {
    isNFTsStoped: isNFTsStoped,
  };
};

export const useStakeBskInfo = () => {
  const {
    data: staked,
    isLoading: isLoading1,
    error: error1,
  } = useSwr<BigNumber>("stakeBskWsp:tvl", fetchScSimpleData);
  const {
    data: issued,
    isLoading: isLoading2,
    error: error2,
  } = useSwr<BigNumber>("stakeBskWsp:issued", fetchScSimpleData);
  const {
    data: totalUsers,
    isLoading: isLoading3,
    error: error3,
  } = useSwr<BigNumber>("stakeBskWsp:total_addresses", fetchScSimpleData);
  const {
    data: minimumStaking,
    isLoading: isLoading4,
    error: error4,
  } = useSwr<BigNumber>("stakeBskWsp:minimum_staking", fetchScSimpleData);

  const info = {
    staked: staked?.toString() || "0",
    issued: issued?.toString() || "0",
    totalUsers: totalUsers?.toNumber() || 0,
    minimumStaking: minimumStaking?.toString() || "0",
  };

  return {
    data: info,
    isLoading: isLoading1 || isLoading2 || isLoading3 || isLoading4,
    error: error1 || error2 || error3 || error4,
  };
};

export const useGetStakeBskUserInfo = () => {
  const address = useAppSelector(selectUserAddress);
  const {
    data: staked,
    isLoading: isLoadingStaked,
    error: errorStaked,
  } = useSwr(["stakeBskWsp:staked", address], () =>
    fetchScSimpleData("stakeBskWsp:staked", [
      new AddressValue(Address.fromBech32(address)),
    ])
  );
  const {
    data: rewards,
    isLoading: isLoadingRewards,
    error: errorRewards,
  } = useSwr(["stakeBskWsp:rewards", address], () =>
    fetchScSimpleData("stakeBskWsp:rewards", [
      new AddressValue(Address.fromBech32(address)),
    ])
  );

  const info = {
    staked: staked?.toString() || "0",
    rewards: rewards?.toString() || "0",
  };

  return {
    data: info,
    isLoading: isLoadingStaked || isLoadingRewards,
    error: errorStaked || errorRewards,
  };
};
