import { ChainId } from "@ashswap/ash-sdk-js/out";
import { Address } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import {
  Blockchain,
  Farm,
  FarmBribe,
  FarmController,
  FeeDistributor,
  Pool,
  PoolV2,
  Rewarder,
  Token,
  VotingEscrow,
} from "./type.graphql";

import { TokenAmount } from "./utils/clasess";
export interface ITokensApr {
  tokenId: string;
  apr: number;
}

export interface IESDTInfo {
  readonly chainId: ChainId;
  readonly identifier: string;
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
  readonly logoURI?: string;
  readonly projectLink?: string;
}

export interface IPool {
  address: string;
  tokens: IESDTInfo[];
  lpToken: IESDTInfo;
  isMaiarPool?: boolean;
  type: EPoolType;
}

export interface IFarm {
  farm_address: string;
  reward_token_id: string;
  reward_token_decimal: number;
  farming_token_id: string;
  farming_token_decimal: number;
  farm_token_id: string;
  farm_token_decimal: number;
  active: boolean;
}

export enum EPoolType {
  PlainPool,
  LendingPool,
  MetaPool,
  PoolV2,
}

export type AshBaseState = {
  farms: Partial<Farm>[];
  pools: Partial<Pool>[];
  poolsV2: Partial<PoolV2>[];
  tokens: Partial<Token>[];
  votingEscrows: Partial<VotingEscrow>[];
  feeDistributor: FeeDistributor | null;
  blockchain: Partial<Blockchain>;
  ashSupply?: string;
  farmController?: FarmController;
  farmBribe?: FarmBribe;
  rewarder?: Rewarder;
};

export type TokenType = IESDTInfo & {
  balance: string;
  valueUsd: number;
  price: number;
};

export enum EPoolState {
  Inactive,
  Active,
  ActiveNoSwaps,
}

export type PoolStatsRecord = {
  address: string;
  apr: number;
  timestamp: number | null;
  token_1_admin_fee_usd: number | null;
  token_1_amount: number;
  token_1_amount_usd: number;
  token_1_total_fee_usd: number | null;
  token_2_admin_fee_usd: number | null;
  token_2_amount: number;
  token_2_amount_usd: number;
  token_2_total_fee_usd: number | null;
  token_3_admin_fee_usd: number | null;
  token_3_amount: number;
  token_3_amount_usd: number;
  token_3_total_fee_usd: number | null;
  transaction_count: number | null;
  tvl: number;
  unique_traders: number | null;
  volume_usd: number;
};

export type PoolRecord = {
  pool: IPool;
  poolStats?: PoolStatsRecord;
  totalSupply: BigNumber;
  state: EPoolState;
  /** if LP balance > 0 -> staked pool*/
  liquidityData?: {
    /** number of own LP token*/
    ownLiquidity: BigNumber;
    /** Lp reserves */
    lpReserves: BigNumber[];
    /** own LP over total LP*/
    capacityPercent: BigNumber;
    /** total liquidity in USD value*/
    lpValueUsd: BigNumber;
  };
};

export type FarmRecord = {
  pool: IPool;
  farm: IFarm;
  poolStats?: PoolStatsRecord;
  stakedData?: {
    farmTokens: FarmToken[];
    totalStakedLP: BigNumber;
    totalRewardAmt: BigNumber;
    rewards: TokenAmount[];
    totalStakedLPValue: BigNumber;
    weightBoost: number;
    yieldBoost: number;
    totalAPR: number;
  };
  ashPerSec: BigNumber;
  lastRewardBlockTs: number;
  farmTokenSupply: BigNumber;
  lpLockedAmt: BigNumber;
  totalLiquidityValue: BigNumber;
  ashBaseAPR: number;
  tokensAPR: {
    tokenId: string;
    apr: number;
  }[];
  tradingAPR: number;
  totalAPRMin: number;
  totalAPRMax: number;
  state: EFarmState;
};

export enum EFarmState {
  Inactive,
  Active,
}

export type FarmToken = {
  tokenId: string;
  collection: string;
  nonce: BigNumber;
  balance: BigNumber;
  attributes: FarmTokenAttrs;
  attrsRaw: string;
  weightBoost: number;
  yieldBoost: number;
  perLP: BigNumber;
  lpAmt: BigNumber;
  farmAddress: string;
};

export interface FarmAdditionalReward {
  token: string;
  reward_per_share: BigNumber;
}
export interface FarmTokenAttrs {
  reward_per_share: BigNumber;
  slope_used: BigNumber;
  booster: Address;
  // after boost amount of token
  initial_farm_amount: BigNumber;
  // real input token for boosting -> boost = initial_farm_amount / initial_farming_amount
  initial_farming_amount: BigNumber;
  reward_tokens: FarmAdditionalReward[];
}
