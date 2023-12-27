import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { fetchMaiarTokens } from "@/services/rest/maiar";
import { fetchScSimpleData } from "@/services/sc/queries";
import {
  IMaiarTokensPairInfo,
  IOneDexOriginalScPairInfo,
} from "@/types/farm.interface";
import { useContext } from "react";
import useSwr from "swr";
import { OneDexFarmContext } from "../FarmOneDex";
import { calculateAPR } from "./functions";
import { fetchOneDexDepositEntries, fetchOneDexFarms } from "./services";

export const useGetOneDexFarms = () => {
  const { data, isLoading, error } = useSwr(
    "oneDexFarmWsp:getFarms",
    fetchOneDexFarms
  );

  return {
    farms: data || [],
    isLoading,
    error,
  };
};

export const useGetOneDexDepositEntries = () => {
  const { farm } = useContext(OneDexFarmContext);

  const address = useAppSelector(selectUserAddress);
  const { data, isLoading, error } = useSwr(
    farm
      ? ["oneDexFarmWsp:getTotalRewardsPerFarm", address, farm?.farm_click_id]
      : null,
    fetchOneDexDepositEntries
  );

  return {
    depositEntries: data,
    isLoading,
    error,
  };
};

export const useGetApr = () => {
  const { farm } = useContext(OneDexFarmContext);
  const {
    data: exchangePairInfos,
    isLoading: exchangeInfoLoading,
    error: exchangeInfoError,
  } = useSwr<IMaiarTokensPairInfo[]>(
    "https://maiartokens.com/token-value/latest/all",
    fetchMaiarTokens
  );
  const {
    data: onedexPairInfos,
    isLoading: onedexInfoLoading,
    error: onedexInfoError,
  } = useSwr<IMaiarTokensPairInfo[]>(
    "https://maiartokens.com/one-dex/token-value/latest",
    fetchMaiarTokens
  );

  const {
    data: oneDexOriginalPairs,
    isLoading: oneDexOriginalLoading,
    error: oneDexOriginalError,
  } = useSwr<IOneDexOriginalScPairInfo[]>(
    "originalOneDexWsp:viewPairs",
    fetchScSimpleData
  );

  const {
    data: apr,
    error,
    isLoading,
  } = useSwr(
    farm && onedexPairInfos && exchangePairInfos && oneDexOriginalPairs
      ? `onedexfarm:${farm?.farm_id}`
      : null,
    async () => {
      return await calculateAPR(
        farm!,
        onedexPairInfos!,
        exchangePairInfos!,
        oneDexOriginalPairs!
      );
    }
  );

  return {
    apr,
    error: error || exchangeInfoError || onedexInfoError || oneDexOriginalError,
    isLoading:
      isLoading ||
      exchangeInfoLoading ||
      onedexInfoLoading ||
      oneDexOriginalLoading,
  };
};
