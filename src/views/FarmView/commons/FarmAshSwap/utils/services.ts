import { getSmartContractInteraction } from "@/services/sc";
import { fetchScSimpleData } from "@/services/sc/queries";
import {
  IAshFarm,
  IAshFarmEntries,
  IAshFarmEntriesScResponse,
  IAshFarmScResponse,
} from "@/types/farm.interface";
import { Address, BigUIntValue, U64Value } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";

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
