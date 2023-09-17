import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import BigNumber from "bignumber.js";
import useSwr from "swr";
import { calculateFarmReward } from "./functions";
import { fetchFarmInfo, fetchUserFarmInfo } from "./services";
export const useGetFarmUserInfo = () => {
  const address = useAppSelector(selectUserAddress);
  const { data, isLoading, error } = useSwr(
    ["bskFarmWsp:viewUserTokenData", address],
    fetchUserFarmInfo
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

  const bnLpStoped = new BigNumber(userFarmInfo.lpStopped);
  const bnUserBlock = new BigNumber(userFarmInfo.lock);
  const bnCurrentBlock = new BigNumber(farmInfo.block);
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

  const bnLpStoped = new BigNumber(userFarmInfo.nftStopped.length);
  const bnUserBlock = new BigNumber(userFarmInfo.lock);
  const bnCurrentBlock = new BigNumber(farmInfo.block);
  const isNFTsStoped = !(
    bnLpStoped.isGreaterThan(0) &&
    bnUserBlock.isLessThanOrEqualTo(bnCurrentBlock)
  );

  return {
    isNFTsStoped: isNFTsStoped,
  };
};
