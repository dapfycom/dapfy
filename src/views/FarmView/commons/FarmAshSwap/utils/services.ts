import { ENVIRONMENT, selectedNetwork } from "@/config/network";
import { getSmartContractInteraction } from "@/services/sc";
import { fetchScSimpleData } from "@/services/sc/queries";
import { IElrondAccountToken } from "@/types/elrond.interface";
import {
  IAshFarm,
  IAshFarmEntries,
  IAshFarmEntriesScResponse,
  IAshFarmScResponse,
} from "@/types/farm.interface";
import { Address, BigUIntValue, U64Value } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import { produce } from "immer";
import moment from "moment";
import {
  ASH_TOKEN,
  FARMS,
  TOKENS_MAP,
  defaultTokenMapState,
} from "../const/const";
import POOLS_BETA2 from "../const/const-devnet";
import POOLS_MAINNET from "../const/const-mainnet";
import {
  AshBaseState,
  EFarmState,
  EPoolState,
  EPoolType,
  FarmRecord,
  IESDTInfo,
  IFarm,
  IPool,
  PoolRecord,
  PoolStatsRecord,
  TokenType,
} from "../type";
import { Farm, Pool, Token } from "../type.graphql";

// Calls
export const harvest = () => {};

export const withdraw = (farmClick: number) => {
  getSmartContractInteraction("ashSwapFarmWsp").scCall({
    functionName: "withdraw",
    arg: [new BigUIntValue(new BigNumber(farmClick))],
    gasL: 200_000_000,
  });
};

export const stake = (amount: string, farmClick: number) => {
  getSmartContractInteraction("ashSwapFarmWsp").EGLDPayment({
    functionName: "deposit",
    arg: [new BigUIntValue(new BigNumber(farmClick))],
    value: amount,
    gasL: 200_000_000,
  });
};

// Queries
export const fetchAshSwapFarms = async (
  scInfo: string
): Promise<IAshFarm[]> => {
  const data = await fetchScSimpleData<IAshFarmScResponse[]>(scInfo);

  const farms: IAshFarm[] = data.map((f) => {
    const farm: IAshFarm = {
      farm_address: f.farm_address.bech32(),
      farm_click_id: f.farm_click_id.toNumber(),
      farm_token: f.farm_token,
      farm_token_nonce: f.farm_token_nonce.toNumber(),
      first_token_id: f.first_token_id,
      lp_token_id: f.lp_token_id,
      pool_address: f.pool_address.bech32(),
      reward_token: f.reward_token,
      second_token_id: f.second_token_id,
      total_deposited_amount: f.total_deposited_amount.toString(),
      total_deposited_farm_amount: f.total_deposited_farm_amount.toString(),
      total_deposited_lp_amount: f.total_deposited_lp_amount.toString(),
      total_farm_rewards: f.total_farm_rewards.toString(),
      total_weighted_block: f.total_weighted_block.toString(),
    };
    return farm;
  });

  return farms;
};

export const fetchAshSwapDepositEntries = async (
  scInfo: string[]
): Promise<IAshFarmEntries> => {
  const key = scInfo[0];
  const address = scInfo[1];
  const farmId = scInfo[2];
  const data = await fetchScSimpleData<IAshFarmEntriesScResponse>(key, [
    new Address(address),
    new U64Value(new BigNumber(farmId)),
  ]);

  const finalData: IAshFarmEntries = {
    deposited_amount: data.deposited_amount.toString(),
    deposited_farm_amount: data.deposited_farm_amount.toString(),
    deposited_lp_amount: data.deposited_lp_amount.toString(),
    farm_click_id: data.farm_click_id.toNumber(),
    lp_id: data.lp_id,
    token_id: data.token_id,
    block_start_staking: data.block_start_staking.toString(),
    rewards: data.rewards.toString(),
  };

  return finalData;
};

// others functions

const ashRawPoolV2ByAddressQuery = (address: string, ashBase: AshBaseState) => {
  return ashBase.poolsV2.find((p) => p.address === address);
};

const ashRawPoolV1ByAddressQuery = (address: string, ashBase: AshBaseState) => {
  return ashBase.pools.find((p) => p.address === address);
};

export const lpBreak = async (
  poolAddress: string,
  wei: string,
  ashBase: AshBaseState
) => {
  const poolConfig = POOLS_MAP_ADDRESS[poolAddress] as IPool;
  const pool = (
    poolConfig.type === EPoolType.PoolV2
      ? ashRawPoolV2ByAddressQuery(poolAddress, ashBase)
      : ashRawPoolV1ByAddressQuery(poolAddress, ashBase)
  ) as Pool;

  const lpReserves = poolConfig.tokens.map((t, i) => {
    if (!pool?.totalSupply) return new BigNumber(0);
    const val = new BigNumber(wei)
      .multipliedBy(pool.reserves[i] || new BigNumber(0))
      .div(pool.totalSupply);
    return val.integerValue(BigNumber.ROUND_FLOOR);
  });
  const valueUsd = new BigNumber(wei)
    .multipliedBy(pool?.lpToken.price || 0)
    .div(10 ** poolConfig.lpToken.decimals);
  return { lpReserves, valueUsd };
};

const _POOLS = ENVIRONMENT === "devnet" ? POOLS_BETA2 : POOLS_MAINNET;

const pools = _POOLS.map((p) => {
  // verify all tokens which present in the pool
  p.tokens.map((t: IESDTInfo) => {
    if (!t) throw new Error("Invalid token identifier in pool");
  });
  if (!p.lpToken) {
    throw new Error("Invalid token identifier in pool");
  }
  return p;
});

export const POOLS_MAP_ADDRESS = Object.fromEntries(
  pools.map((p) => [p.address, p])
);

export const getFarmRecord = async (
  f: IFarm,
  p: IPool,
  ashBase: AshBaseState,
  tokenMap: Record<string, TokenType>,
  poolRecords: PoolRecord[]
) => {
  const rawFarm = ashBase.farms.find(
    (_f) => _f.address === f.farm_address
  ) as Farm;
  const poolState = poolRecords.find((_p) => _p.pool.address === p.address);
  const farmTokenSupply = new BigNumber(rawFarm?.farmTokenSupply || 0);
  const lpLockedAmt = new BigNumber(rawFarm?.farmingTokenBalance || 0);
  const { valueUsd: workingBalanceUsd } = await lpBreak(
    p.address,
    farmTokenSupply.toString(), // cause farm decimals = LP decimals = 18
    ashBase
  );
  const { valueUsd: totalLiquidityValue } = await lpBreak(
    p.address,
    lpLockedAmt.toString(),
    ashBase
  );

  const ashPerSec = new BigNumber(rawFarm?.rewardPerSec || 0);

  const totalASHPerYear = toEGLDD(
    ASH_TOKEN.decimals,
    ashPerSec.multipliedBy(365 * 24 * 60 * 60)
  );

  // Calc apr
  const ashBaseAPR = workingBalanceUsd.gt(0)
    ? totalASHPerYear
        .multipliedBy(tokenMap[ASH_TOKEN.identifier]?.price || 0) // get total value of ASH in USD
        .multipliedBy(0.4) // get the base APR in case 0.25 farm_token = 1 LP
        .multipliedBy(100)
        .div(workingBalanceUsd)
        .toNumber()
    : 0;
  const tradingAPR = poolState?.poolStats?.apr || 0;
  const currentTs = moment().unix();

  const tokensAPR =
    rawFarm?.additionalRewards
      .filter(
        (r) =>
          !!TOKENS_MAP[r.tokenId] &&
          r.periodRewardEnd > currentTs &&
          new BigNumber(r.rewardPerSec).gt(0)
      )
      .map((r) => {
        const t = TOKENS_MAP[r.tokenId];
        if (!t || totalLiquidityValue.eq(0) || currentTs > r.periodRewardEnd)
          return { apr: 0, tokenId: r.tokenId };
        const tokenPerYear = new BigNumber(r.rewardPerSec).multipliedBy(
          365 * 24 * 60 * 60
        );
        const valueUsd = toEGLDD(t.decimals, tokenPerYear).multipliedBy(
          tokenMap[t.identifier].price
        );
        return {
          apr: valueUsd.multipliedBy(100).div(totalLiquidityValue).toNumber(),
          tokenId: t.identifier,
        };
      }) || [];

  const record: FarmRecord = {
    pool: p,
    farm: f,
    poolStats: poolState?.poolStats,
    ashPerSec,
    lastRewardBlockTs: rawFarm?.lastRewardBlockTs || 0,
    farmTokenSupply,
    lpLockedAmt,
    totalLiquidityValue,
    ashBaseAPR,
    tokensAPR,
    tradingAPR,
    state: rawFarm?.state
      ? (EFarmState[rawFarm.state as any] as unknown as EFarmState) ??
        EFarmState.Inactive
      : EFarmState.Inactive,
    totalAPRMin:
      ashBaseAPR + tradingAPR + tokensAPR.reduce((sum, t) => (sum += t.apr), 0),
    totalAPRMax:
      ashBaseAPR * 2.5 +
      tradingAPR +
      tokensAPR.reduce((sum, t) => (sum += t.apr), 0),
  };

  return record;
};

export const getFarmRecords = async (
  {
    farmsInController,
    errorFarmInController,
  }: {
    farmsInController: string[];
    errorFarmInController: any;
  },
  ashBase: AshBaseState,
  tokenMap: Record<string, TokenType>,
  poolRecords: PoolRecord[]
) => {
  const recordPromises: Promise<Partial<FarmRecord>>[] = [];
  const inController = farmsInController || [];
  for (let i = 0; i < FARMS.length; i++) {
    const f = FARMS[i];
    const rawFarm = ashBase.farms.find((_f) => _f.address === f.farm_address);
    const p = pools.find(
      (val) => val.lpToken.identifier === f.farming_token_id
    );
    if (
      p &&
      (!!errorFarmInController ||
        inController.includes(f.farm_address) ||
        (rawFarm?.additionalRewards || []).length > 0)
    ) {
      recordPromises.push(getFarmRecord(f, p, ashBase, tokenMap, poolRecords));
    }
  }
  const records = await Promise.all(recordPromises);

  return records;
};

export const getPoolRecord = async (
  p: IPool,
  ashBase: AshBaseState,
  tokenMap: Record<string, TokenType>,
  poolStatsRecords: PoolStatsRecord[]
) => {
  const rawPool =
    p.type === EPoolType.PoolV2
      ? ashBase.poolsV2.find((_p) => _p.address === p.address)
      : ashBase.pools.find((_p) => _p.address === p.address);
  const totalSupply = new BigNumber(rawPool?.totalSupply || 0);
  let record: PoolRecord = {
    pool: p,
    poolStats: poolStatsRecords?.find((stats) => stats.address === p.address),
    totalSupply,
    state: rawPool?.state
      ? (EPoolState[rawPool.state as any] as unknown as EPoolState) ??
        EPoolState.Inactive
      : EPoolState.Inactive,
  };
  const ownLP = new BigNumber(tokenMap[p.lpToken.identifier]?.balance || 0);

  if (ownLP.gt(0)) {
    const { lpReserves, valueUsd: lpValueUsd } = await lpBreak(
      p.address,
      ownLP.toString(),
      ashBase
    );

    record.liquidityData = {
      ownLiquidity: ownLP,
      capacityPercent: BigNumber.min(
        totalSupply.eq(0)
          ? new BigNumber(0)
          : ownLP.multipliedBy(100).div(totalSupply),
        100
      ),
      lpReserves,
      lpValueUsd,
    };
  }
  return record;
};

export const getPoolsRecords = async (
  ashBase: AshBaseState,
  tokenMap: Record<string, TokenType>,
  poolStatsRecords: PoolStatsRecord[]
): Promise<PoolRecord[]> => {
  const recordPromises: Promise<PoolRecord>[] = [];
  for (let i = 0; i < pools.length; i++) {
    const p = pools[i];
    if (p.isMaiarPool) continue;
    recordPromises.push(getPoolRecord(p, ashBase, tokenMap, poolStatsRecords));
  }
  const records = await Promise.all(recordPromises);

  return records;
};

export const toEGLDD = (decimals: number, num: BigNumber.Value) => {
  if (num === "") {
    return new BigNumber(0);
  }

  let amount = new BigNumber(num);
  amount = amount.div(new BigNumber(10).exponentiatedBy(decimals));

  if (amount.lt(0)) {
    return new BigNumber(0);
  }

  return amount;
};

export const fetcher = (
  params: [input: RequestInfo, init?: RequestInit] | string
) => {
  if (typeof params === "string")
    return fetch(params).then((res) => res.json());
  const [input, init] = params;
  return fetch(input, init).then((res) => res.json());
};

export const setTokenMap = (
  tokens: Partial<Token>[],
  data: {
    balance: string;
    identifier: string;
  }[],
  EgldInAccount: Partial<IElrondAccountToken>
) => {
  const egldBalance = new BigNumber(EgldInAccount.balance || 0);

  const map = produce(defaultTokenMapState, (draft) => {
    // code inside the produce function

    const tokenMap = Object.fromEntries(tokens.map((t) => [t.id, t]));
    const dataMap = Object.fromEntries(
      data?.map((t) => [t.identifier, t]) || []
    );
    Object.keys(draft).map((id) => {
      draft[id].price =
        (id === "EGLD"
          ? tokenMap[selectedNetwork.tokensID.wegld]?.price
          : tokenMap[id]?.price) || 0;
      draft[id].balance =
        id === "EGLD" ? egldBalance.toString() : dataMap[id]?.balance || "0";
      draft[id].valueUsd = toEGLDD(draft[id].decimals, draft[id].balance)
        .multipliedBy(draft[id].price)
        .toNumber();
    });
  });

  return { ...map };
};
