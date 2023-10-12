import { getSmartContractInteraction } from "@/services/sc";
import { scQuery } from "@/services/sc/queries";
import { IElrondToken } from "@/types/elrond.interface";
import { IMoneyMarket } from "@/types/hatom.interface";
import { Address, AddressValue } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";

//calls
export const deposit = (
  amount: number | string,
  lpToken: IElrondToken,
  address: string
) => {
  getSmartContractInteraction("hatomParentWsp").ESDTTransfer({
    functionName: "deposit",
    token: { ...lpToken, collection: lpToken.identifier },
    arg: [new AddressValue(new Address(address))],
    gasL: 70000000,
    value: new BigNumber(amount),
  });
};

export const claimUserRewards = (address: string) => {
  getSmartContractInteraction("hatomParentWsp").scCall({
    functionName: "claimUserRewards",
    gasL: 50000000,
    arg: [new AddressValue(new Address(address))],
  });
};

export const withdraw = (address: string) => {
  getSmartContractInteraction("hatomParentWsp").scCall({
    functionName: "withdraw",
    gasL: 50000000,
    arg: [new AddressValue(new Address(address))],
  });
};

// queries
export const fetchHatomMoneyMarkets = async (): Promise<IMoneyMarket[]> => {
  const res: any = await scQuery("hatomParentWsp", "getMoneyMarkets", []);
  const { firstValue } = res;
  const data = firstValue?.valueOf();

  const paresedData: IMoneyMarket[] = data?.map((item: any) => {
    return {
      htokenI: item.htoken_id,
      tokenI: item.token_id,
      mmScAddress: item.mm_address.bech32(),
      childScAddress: item.my_sc_address.bech32(),
    };
  });

  return paresedData;
};
