import { getSmartContractInteraction } from "@/services/sc";
import { fetchScSimpleData } from "@/services/sc/queries";
import {
  IOnDexEntries,
  IOnDexEntriesScResponse,
  IOnDexFarm,
  IOnDexScResponse,
} from "@/types/farm.interface";
import { Address, BigUIntValue, U64Value } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";

// Calls
export const harvest = () => {};

export const withdraw = (farmClick: number) => {
  getSmartContractInteraction("oneDexFarmWsp").scCall({
    functionName: "withdraw",
    arg: [new BigUIntValue(new BigNumber(farmClick))],
    gasL: 200_000_000,
  });
};

export const stake = (amount: string, farmClick: number) => {
  return getSmartContractInteraction("oneDexFarmWsp").EGLDPayment({
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
      apr_first_token_reserve: f.apr_first_token_reserve.toString(),
      apr_lp_token_supply: f.apr_lp_token_supply.toString(),
      apr_yearly_reward_amount: f.apr_yearly_reward_amount.toString(),
    };
    return farm;
  });

  return farms;
};

export const fetchOneDexDepositEntries = async (
  scInfo: string
): Promise<IOnDexEntries | undefined> => {
  const key = scInfo[0];
  const address = scInfo[1];
  const farmId = scInfo[2];

  const data = await fetchScSimpleData<IOnDexEntriesScResponse | undefined>(
    key,
    [new Address(address), new U64Value(new BigNumber(farmId))]
  );

  console.log({
    data,
  });

  const finalData: IOnDexEntries | undefined = data && {
    deposited_amount: data.deposited_amount.toString(),
    deposited_lp_amount: data.deposited_lp_amount.toString(),
    farm_click_id: data.farm_click_id.toNumber(),
    lp_id: data.lp_id,
    token_id: data.token_id,
    block_start_staking: data.block_start_staking.toString(),
    rewards: data.rewards.toString(),
  };

  return finalData;
};
