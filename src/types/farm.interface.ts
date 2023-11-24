import { Address } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
export interface IUserFarmInfo {
  userTokens: {
    reward: string;
    debtLp: string;
    debtNft: string;
  }[];
  lpActive: string;
  lpStopped: string;
  nftActive: string[];
  nftStopped: string[];
  lock: any;
}

export interface IFarmInfo {
  tokenId: string[];
  tokenNonce: string[];
  start: string[];
  end: string[];
  totalRewards: string[];
  perShareLp: string[];
  perShareNft: string[];
  stakedLp: string;
  stakedNft: string;
  block: string;
}

export interface IAshFarm {
  farm_click_id: number;
  pool_address: string;
  first_token_id: string;
  second_token_id: string;
  lp_token_id: string;
  farm_token: string;
  farm_token_nonce: number;
  farm_address: string;
  reward_token: string;
  total_deposited_amount: string;
  total_deposited_lp_amount: string;
  total_deposited_farm_amount: string;
  total_weighted_block: string;
  total_farm_rewards: string;
}

export interface IAshFarmScResponse {
  farm_click_id: BigNumber;
  pool_address: Address;
  first_token_id: string;
  second_token_id: string;
  lp_token_id: string;
  farm_token: string;
  farm_token_nonce: BigNumber;
  farm_address: Address;
  reward_token: string;
  total_deposited_amount: BigNumber;
  total_deposited_lp_amount: BigNumber;
  total_deposited_farm_amount: BigNumber;
  total_weighted_block: BigNumber;
  total_farm_rewards: BigNumber;
}
