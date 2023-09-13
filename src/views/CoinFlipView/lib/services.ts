import { Address, AddressValue, U32Value } from "@multiversx/sdk-core";
import BigNumber from "bignumber.js";
import { selectedNetwork } from "config/network";
import {
  IFetchTransactionParams,
  fetchTransactions,
} from "services/rest/elrond/transactions";
import { scQuery } from "services/sc/queries";
import { IFlipBet } from "types/flip.inteface";
import { betAdapter } from "./functions";

export const fetchUserBetsCount = async (address: string): Promise<number> => {
  const res = await scQuery("flipWsp", "getMyBetsCount", [
    new AddressValue(new Address(address)),
  ]);

  const { firstValue } = res;
  const data = firstValue?.valueOf();
  return data?.toNumber() || 0;
};
export const fetchAllTimeBets = async (): Promise<number> => {
  const res = await scQuery("flipWsp", "getAllBetsCount");

  const { firstValue } = res;
  const data = firstValue?.valueOf();
  return data?.toNumber() || 0;
};
export const fetchVolume = async (): Promise<number> => {
  const res = await scQuery("flipWsp", "getTotalVolume");

  const { firstValue } = res;
  const data = firstValue?.valueOf();
  return data?.toNumber() || 0;
};
export const fetchHouseWinVolume = async (): Promise<number> => {
  const res = await scQuery("flipWsp", "getTotalHouseWinVolume");

  const { firstValue } = res;
  const data = firstValue?.valueOf();
  return data?.toNumber() || 0;
};
export const fetchPlayersCount = async (): Promise<number> => {
  const res = await scQuery("flipWsp", "getAllUsersCount");

  const { firstValue } = res;
  const data = firstValue?.valueOf();
  return data?.toNumber() || 0;
};
export const fetchAllPlayersVolume = async (
  totalUsers: number,
  pageSize: number = 50
): Promise<
  {
    address: string;
    amount: string;
  }[]
> => {
  const totalPages = Math.ceil(totalUsers / pageSize);
  const allUsers = [];

  const fetchPage = async (page: number) => {
    const res = await scQuery("flipWsp", "getAllPaginatedUserVolume", [
      new U32Value(new BigNumber(pageSize)),
      new U32Value(new BigNumber(page)),
    ]);

    const { firstValue } = res;
    const data = firstValue?.valueOf();

    if (data) {
      const volumeData = data.map((d) => {
        return {
          address: d[0].bech32(),
          amount: d[1].toString(),
        };
      });
      allUsers.push(...volumeData);
    }
  };

  const fetchAllPages = async () => {
    const pagePromises = [];
    for (let page = 0; page < totalPages; page++) {
      pagePromises.push(fetchPage(page));
    }
    await Promise.all(pagePromises);
    return allUsers;
  };

  const finalData = await fetchAllPages();

  return finalData;
};

export const fetchUserBets = async (
  address: string,
  size: number
): Promise<IFlipBet[]> => {
  const params: IFetchTransactionParams = {
    function: "flip",
    receiver: selectedNetwork.scAddress.flip,
    status: "success",
    order: "desc",
    withScResults: true,
    fields: "sender,txHash,action,timestamp,results",
    sender: address,
    size: size,
  };

  const txs = await fetchTransactions(params);

  const finalData = betAdapter(txs);
  return finalData;
};
export const fetchAllBets = async (size?: number): Promise<IFlipBet[]> => {
  const params: IFetchTransactionParams = {
    function: "flip",
    receiver: selectedNetwork.scAddress.flip,
    status: "success",
    order: "desc",
    withScResults: true,
    fields: "sender,txHash,action,timestamp,results",
    size: size,
  };

  const txs = await fetchTransactions(params);

  const finalData = betAdapter(txs);

  return finalData;
};
