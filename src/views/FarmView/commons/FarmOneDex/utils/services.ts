import { getSmartContractInteraction } from "@/services/sc";
import { fetchScSimpleData } from "@/services/sc/queries";
import { IOnDexFarm, IOnDexScResponse } from "@/types/farm.interface";
import { BigUIntValue } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";

// Calls
export const harvest = () => {};

export const withdraw = (farmClick: number) => {
  getSmartContractInteraction("oneDexFarmWsp").scCall({
    functionName: "withdraw",
    arg: [new BigUIntValue(new BigNumber(farmClick))],
  });
};

export const stake = (amount: string, farmClick: number) => {
  getSmartContractInteraction("oneDexFarmWsp").EGLDPayment({
    functionName: "deposit",
    arg: [new BigUIntValue(new BigNumber(farmClick))],
    value: amount,
    gasL: 200_000_000,
  });
};

// Queries
export const fetchOneDexFarms = async (
  scInfo: string
): Promise<IOnDexFarm[]> => {
  const data = await fetchScSimpleData<IOnDexScResponse[]>(scInfo);

  const farms: IOnDexFarm[] = data.map((f) => {
    const farm: IOnDexFarm = {
      farm_click_id: f.farm_click_id.toNumber(),
      pool_address: f.pool_address.bech32(),
      pool_id: f.pool_id.toNumber(),
      first_token_id: f.first_token_id,
      second_token_id: f.second_token_id,
      lp_token_id: f.lp_token_id,
      farm_address: f.farm_address.bech32(),
      farm_id: f.farm_id.toNumber(),
      reward_token: f.reward_token,
      total_deposited_amount: f.total_deposited_amount.toString(),
      total_deposited_lp_amount: f.total_deposited_lp_amount.toString(),
      total_weighted_block: f.total_weighted_block.toString(),
      total_lp_rewards: f.total_lp_rewards.toString(),
    };
    return farm;
  });

  return farms;
};
