import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import request, { gql } from "graphql-request";
import { useContext } from "react";
import useSwr, { SWRConfiguration } from "swr";
import { AshFarmContext } from "../FarmAshSwap";
import { ASHSWAP_CONFIG } from "../const/ashswapConfig";
import { basicAshFarms } from "../const/mockedData";
import { AshBaseState, PoolStatsRecord } from "../type";
import {
  fetchAshSwapDepositEntries,
  fetchAshSwapFarms,
  fetcher,
  getFarmRecords,
  getPoolsRecords,
} from "./services";
import useGetTokens from "./useGetTokens";

export const useGetAshSwapFarms = () => {
  const { data, isLoading, error } = useSwr(
    "ashSwapFarmWsp:getFarms",
    fetchAshSwapFarms
  );

  return {
    farms: data || [],
    isLoading,
    error,
  };
};
export const useGetAshSwapDepositEntries = () => {
  const { farm } = useContext(AshFarmContext);

  const address = useAppSelector(selectUserAddress);
  const { data, isLoading, error } = useSwr(
    farm
      ? ["ashSwapFarmWsp:getTotalRewardsPerFarm", address, farm?.farm_click_id]
      : null,
    fetchAshSwapDepositEntries
  );

  return {
    depositEntries: data,
    isLoading,
    error,
  };
};

export const useGetAshFarmApr = () => {
  const {
    ashswapBaseState,
    isLoading: l1,
    error: e1,
  } = useGetAshswapBaseState();
  const { tokenMap, isLoading: l2, error: e2 } = useGetTokens();
  const { poolRecords, isLoading: l3, error: e3 } = useGetPoolRecords();
  const {
    farmsInController,
    isLoading: l4,
    error: e4,
  } = useFarmsInController();

  const {
    data: ashFarmsRecords,
    isLoading: l5,
    error: e5,
  } = useSwr(
    farmsInController && ashswapBaseState && tokenMap && poolRecords
      ? [
          "ashSwapFarmWsp:getAshFarmsRecords",
          farmsInController,
          ashswapBaseState,
          tokenMap,
          poolRecords,
        ]
      : null,
    () => {
      return getFarmRecords(
        {
          errorFarmInController: e4,
          farmsInController: farmsInController || [],
        },
        ashswapBaseState,
        tokenMap,
        poolRecords
      );
    }
  );

  return {
    farmRecords: ashFarmsRecords || [],
    isLoading: l1 || l2 || l3 || l4 || l5,
    error: e1 || e2 || e3 || e4 || e5,
  };
};

export const useGetAshswapBaseState = (): {
  ashswapBaseState: AshBaseState;
  isLoading: boolean;
  error: any;
} => {
  const data: AshBaseState = basicAshFarms;

  return {
    ashswapBaseState: data,
    isLoading: false,
    error: null,
  };
};

export const useGetPoolRecords = () => {
  const {
    ashswapBaseState,
    isLoading: l1,
    error: e1,
  } = useGetAshswapBaseState();
  const { tokenMap, isLoading: l2, error: e2 } = useGetTokens();

  // fetch pool stats
  const {
    data: poolStatsRecords,
    mutate: poolStatsRefresher,
    isLoading: l4,
    error: e4,
  } = useSwr<PoolStatsRecord[]>(
    `${ASHSWAP_CONFIG.ashApiBaseUrl}/pool`,
    fetcher
  );

  const {
    data,
    isLoading: l3,
    error: e3,
  } = useSwr(
    ashswapBaseState && tokenMap && poolStatsRecords
      ? [
          "ashSwapFarmWsp:getPoolRecords",
          ashswapBaseState,
          tokenMap,
          poolStatsRecords,
        ]
      : null,
    async () => {
      return getPoolsRecords(
        ashswapBaseState,
        tokenMap,
        poolStatsRecords || []
      );
    }
  );

  return {
    poolRecords: data || [],
    refreshPoolRecords: poolStatsRefresher,
    isLoading: l1 || l2 || l3 || l4,
    error: e1 || e2 || e3 || e4,
  };
};

const query = gql`
  query farmsInController {
    farmController {
      farms {
        address
      }
    }
  }
`;

const useFarmsInController = (swrConfig?: SWRConfiguration) => {
  const { data, isLoading, error } = useSwr<string[]>(
    "farmsInController",
    () =>
      request(`${ASHSWAP_CONFIG.ashGraphBaseUrl}`, query).then(
        (res: any) =>
          res?.farmController?.farms?.map((f: any) => f.address) || []
      ),
    swrConfig
  );
  return { farmsInController: data, error, isLoading };
};
