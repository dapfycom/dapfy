import { ITransacation } from "@/types/elrond.interface";
import { IFlipBet } from "@/types/flip.inteface";
import {
  Base64toString,
  convertToBoolean,
  extractStringsBetweenAts,
} from "@/utils/functions/sc";
import BigNumber from "bignumber.js";

export const betAdapter = (transactions: ITransacation[]): IFlipBet[] => {
  if (!transactions) {
    return [];
  }
  const bets = transactions.map((tx) => {
    if (tx.results) {
      const flipResult = tx.results.find((result) =>
        Base64toString(result.data).startsWith("@00")
      )?.data;

      if (flipResult && tx.action.arguments.functionArgs.length === 1) {
        const gameReultsStr = Base64toString(flipResult);

        const gameReultsArr = extractStringsBetweenAts(gameReultsStr);

        const userChoiseStr = tx.action.arguments.functionArgs[0];
        const systemChoiseStr = gameReultsArr[1];

        const userBet = convertToBoolean(userChoiseStr);
        const systemBet = convertToBoolean(systemChoiseStr);
        const data: IFlipBet = {
          address: tx.sender,
          id: tx.txHash,
          txHash: tx.txHash,
          betAmount: tx.action.arguments.transfers[0].value,
          result: systemBet,
          isHeadBet: userBet,
          creationDate: new Date(tx.timestamp * 1000),
        };

        return data;
      }
    }
    return null;
  });

  return bets.filter((el) => el !== null) as IFlipBet[];
};

export const selectChoise = (choise?: boolean) => {
  return choise ? "HEAD" : "TAILS";
};

export const getTopVolume = (
  usersVolume: { address: string; amount: string }[],
  countToReturn: number = 10
): { address: string; amount: string }[] => {
  // Create a Set to keep track of unique addresses
  const uniqueAddresses = new Set<string>();

  // Filter out duplicates based on the address
  const uniqueUsers = usersVolume.filter((user) => {
    if (uniqueAddresses.has(user.address)) {
      return false;
    }
    uniqueAddresses.add(user.address);
    return true;
  });

  // Sort the unique users according to the volume in descending order
  const sortedUsers = uniqueUsers.sort((a, b) => {
    const volumeA = new BigNumber(a.amount);
    const volumeB = new BigNumber(b.amount);
    return volumeB.minus(volumeA).toNumber();
  });

  // Get the top users according to countToReturn
  const topUsers = sortedUsers.slice(0, countToReturn);

  return topUsers;
};
