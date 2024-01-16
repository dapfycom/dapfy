import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import request, { Variables, gql } from "graphql-request";
import { produce } from "immer";
import { useContext } from "react";
import useSwr, { SWRConfiguration } from "swr";
import { AshFarmContext } from "../FarmAshSwap";
import { ASHSWAP_CONFIG } from "../const/ashswapConfig";
import { FARMS_MAP } from "../const/const";
import { AshBaseState, PoolStatsRecord } from "../type";
import {
  POOLS_MAP_ADDRESS,
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

export const graphqlFetcher = ([query, variables]: [
  query: string,
  variables?: Variables
]) =>
  request<AshBaseState>(
    `${ASHSWAP_CONFIG.ashGraphBaseUrl}`,
    query,
    variables
  ).then((data) => {
    return produce(data, (draft) => {
      if (draft.farmController) {
        draft.farmController.farms =
          draft.farmController.farms?.filter((f) => !!FARMS_MAP[f.address]) ||
          [];
        if (draft.farmController.account) {
          draft.farmController.account.farms =
            draft.farmController.account.farms?.filter(
              (f) => !!FARMS_MAP[f.address]
            ) || [];
        }
      }
      if (draft.farmBribe) {
        draft.farmBribe.farms =
          draft.farmBribe.farms?.filter((f) => !!FARMS_MAP[f.address]) || [];
        if (draft.farmBribe.account) {
          draft.farmBribe.account.farms =
            draft.farmBribe.account.farms?.filter(
              (f) => !!FARMS_MAP[f.address]
            ) || [];
        }
      }
      if (draft.farms) {
        draft.farms =
          draft.farms?.filter((f) => !!FARMS_MAP[f?.address || ""]) || [];
      }
      if (draft.pools) {
        draft.pools =
          draft.pools?.filter((p) => !!POOLS_MAP_ADDRESS[p?.address || ""]) ||
          [];
      }
      if (draft.poolsV2) {
        draft.poolsV2 =
          draft.poolsV2?.filter((p) => !!POOLS_MAP_ADDRESS[p?.address || ""]) ||
          [];
      }
    });
  });
export const useGetAshswapBaseState = (): {
  ashswapBaseState: AshBaseState;
  isLoading: boolean;
  error: any;
} => {
  const address = useAppSelector(selectUserAddress);
  const { data, isLoading, error } = useSwr<AshBaseState>(
    [
      gql`
        query ashBaseStateQuery($accAddress: String = "") {
          farms(address: $accAddress) {
            address
            farmToken {
              ...allTokenProps
            }
            rewardToken {
              ...allTokenProps
            }
            farmingToken {
              ...allTokenProps
            }
            farmTokenSupply
            rewardPerSec
            rewardPerShare
            state
            lastRewardBlockTs
            divisionSafetyConstant
            farmingTokenBalance
            produceRewardEnabled
            account {
              slopeBoosted
            }
            shard
            additionalRewards {
              rewardPerSec
              rewardPerShare
              periodRewardEnd
              tokenId
            }
          }
          pools {
            address
            lpToken {
              ...allTokenProps
            }
            tokens {
              ...allTokenProps
            }
            reserves
            underlyingPrices
            totalSupply
            swapFeePercent
            adminFeePercent
            ampFactor
            state
          }
          poolsV2 {
            address
            lpToken {
              ...allTokenProps
            }
            totalSupply
            reserves
            priceScale
            ampFactor
            gamma
            xp
            futureAGammaTime
            d
            midFee
            outFee
            feeGamma
            state
          }
          tokens {
            ...allTokenProps
          }
          votingEscrows(address: $accAddress) {
            address
            lockedToken {
              ...allTokenProps
            }
            totalLock
            veSupply
            account {
              locked {
                amount
                end
              }
            }
          }
          feeDistributor(address: $accAddress) {
            address
            rewardToken {
              ...allTokenProps
            }
            account {
              reward
            }
          }
          blockchain {
            blockShards {
              shard
              nonce
            }
          }
        }

        fragment allTokenProps on Token {
          id
          price
        }
      `,
      { accAddress: address },
    ],
    graphqlFetcher,
    { refreshInterval: 15000 }
  );

  return {
    ashswapBaseState: data || {
      farms: [],
      pools: [],
      poolsV2: [],
      tokens: [],
      votingEscrows: [],
      feeDistributor: null,
      blockchain: {},
      ashSupply: "0",
    },
    isLoading: isLoading,
    error: error,
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
