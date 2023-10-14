import { IMoneyMarket, IMoneyMarketDeposit } from "@/types/hatom.interface";
import BigNumber from "bignumber.js";

export const parsMoneyMarket = (data: any): IMoneyMarket => {
  const paresedData: IMoneyMarket = {
    htokenI: data.htoken_id,
    tokenI: data.token_id,
    mmScAddress: data.mm_address.bech32(),
    childScAddress: data.my_sc_address.bech32(),
  };

  return paresedData;
};

export const calcStakedAmount = (deposits: IMoneyMarketDeposit[]) => {
  const stakedAmount = deposits.reduce((acc, item) => {
    return acc.plus(item.depositAmount);
  }, new BigNumber(0));
  return stakedAmount.toString();
};
