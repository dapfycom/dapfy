import { getSmartContractInteraction } from "@/services/sc";
import { fetchScSimpleData } from "@/services/sc/queries";
import { IOnDexFarm, IOnDexScResponse } from "@/types/farm.interface";
import { BigUIntValue } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";

// Calls
export const harvest = () => {};

export const withdraw = (farmClick: number) => {
  getSmartContractInteraction("ashSwapFarmWsp").scCall({
    functionName: "withdraw",
    arg: [new BigUIntValue(new BigNumber(farmClick))],
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
export const fetchOneDexFarms = async (
  scInfo: string
): Promise<IOnDexFarm[]> => {
  console.log("fetchOneDexFarms", fetchOneDexFarms);

  const data = await fetchScSimpleData<IOnDexScResponse[]>(scInfo);
  console.log("data", data);

  const farms: IOnDexFarm[] = data.map((f) => {
    const farm: IOnDexFarm = {
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
