import { getSmartContractInteraction } from "@/services/sc";
import {
  fetchScSimpleData,
  scQuery,
  scQueryByFieldsDefinitions,
} from "@/services/sc/queries";
import { IElrondToken } from "@/types/elrond.interface";
import {
  IAshFarm,
  IAshFarmScResponse,
  IFarmInfo,
  IUserFarmInfo,
} from "@/types/farm.interface";
import { setElrondBalance } from "@/utils/functions/formatBalance";
import {
  Address,
  AddressValue,
  BigUIntValue,
  List,
  ListType,
  U64Type,
  BigUIntType,
  BinaryCodec,
  FieldDefinition,
  StructType,
  U64Value,
  AddressType,
  BytesType,
} from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import { getFarmNftIdentifier } from "./functions";

//calls
export const stakeLP = (amount: number | string, lpToken: IElrondToken) => {
  getSmartContractInteraction("bskFarmWsp").ESDTTransfer({
    functionName: "deposit",
    token: { ...lpToken, collection: lpToken.identifier },
    gasL: 70000000,
    value: Number(amount),
  });
  // ESDTTransfer({
  //   contractAddr: selectedNetwork.scAddress.farm,
  //   funcName: "deposit",
  //   gasL: 70000000,
  //   val: amount,
  //   token: lpToken,
  // });
};
export const stop = (lpAmount: string | number, nonces: number[]) => {
  const noncesArgs = nonces.map((nonce) => {
    return new U64Value(new BigNumber(nonce));
  });

  getSmartContractInteraction("bskFarmWsp").scCall({
    functionName: "stop",
    arg: [
      new BigUIntValue(new BigNumber(setElrondBalance(Number(lpAmount), 18))),
      new List(new ListType(new U64Type()), noncesArgs),
    ],
    gasL: 50000000,
  });
  // scCall(
  //   "bskFarmWsp",
  //   "stop",
  //   [
  //     new BigUIntValue(new BigNumber(setElrondBalance(Number(lpAmount), 18))),
  //     new List(new ListType(new U64Type()), noncesArgs),
  //   ],
  //   50000000
  // );
};

//queries
export const fetchUserFarmInfo = async ([key, address]: [string, string]) => {
  const dataFields = [
    ["reward", "List<BigUint>"],
    ["debtLp", "List<BigUint>"],
    ["debtNft", "List<BigUint>"],
    ["lpActive", "BigUint"],
    ["lpStopped", "BigUint"],
    ["nftActive", "List<u64>"],
    ["nftStopped", "List<u64>"],
    ["lock", "u64"],
  ];
  const parsed = await scQueryByFieldsDefinitions(
    "bskFarmWsp",
    "viewUserTokenData",
    [new AddressValue(new Address(address))],
    dataFields
  );

  const scdata: Record<string, BigNumber | Array<BigNumber>> = {
    reward: [],
    debtLp: [],
    debtNft: [],
    lpActive: new BigNumber(0),
    lpStopped: new BigNumber(0),
    nftActive: [],
    nftStopped: [],
    lock: new BigNumber(0),
  };

  parsed.forEach((item, index) => {
    scdata[dataFields[index][0]] = item.valueOf();
  });
  const newData: IUserFarmInfo = {
    userTokens: (scdata.reward as Array<BigNumber>).map(
      (reward: BigNumber, index: number) => ({
        reward: reward.toString(),
        debtLp: (scdata.debtLp as Array<BigNumber>)[index].toString(),
        debtNft: (scdata.debtNft as Array<BigNumber>)[index].toString(),
      })
    ),
    lpActive: (scdata.lpActive as BigNumber).toString(),
    lpStopped: (scdata.lpStopped as BigNumber).toString(),
    nftActive: (scdata.nftActive as Array<BigNumber>).map(getFarmNftIdentifier),
    nftStopped: (scdata.nftStopped as Array<BigNumber>).map(
      getFarmNftIdentifier
    ),
    lock: (scdata.lock as BigNumber)?.toNumber(),
  };
  return newData;
};
export const fetchFarmInfo = async () => {
  const dataFields = [
    ["tokenId", "List<TokenIdentifier>"],
    ["tokenNonce", "List<u64>"],
    ["start", "List<u64>"],
    ["end", "List<u64>"],
    ["totalRewards", "List<BigUint>"],
    ["perShareLp", "List<BigUint>"],
    ["perShareNft", "List<BigUint>"],
    ["stakedLp", "BigUint"],
    ["stakedNft", "u32"],
    ["block", "u64"],
  ];

  const parsed = await scQueryByFieldsDefinitions(
    "bskFarmWsp",
    "viewAppTokenData",
    [],
    dataFields
  );

  const data: IFarmInfo = {
    tokenId: [],
    tokenNonce: [],
    start: [],
    end: [],
    totalRewards: [],
    perShareLp: [],
    perShareNft: [],
    stakedLp: "0",
    stakedNft: "0",
    block: "0",
  };

  parsed.forEach((item, index) => {
    const value = item.valueOf();

    // @ts-ignore
    data[dataFields[index][0]] = Array.isArray(value)
      ? value.map((i) => (index === 0 ? i.toString() : i.toFixed()))
      : value.toFixed();
  });

  const newTokens = new Set<string>();
  const tokenData = {};
  data.tokenId.forEach((id: string, index) => {
    const tokenIdentifier = `${id}-${data.tokenNonce[index]}`;

    // @ts-ignore
    if (!tokenData[id]) {
      newTokens.add(tokenIdentifier);
    }
  });

  return data;
};

/* New data  */
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
