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

  return bets.filter((el) => el !== null);
};

export const selectChoise = (choise?: boolean) => {
  return choise ? "HEAD" : "TAILS";
};

export const getTopVolume = (
  usersVolume: { address: string; amount: string }[],
  countToReturn: number = 10
): { address: string; amount: string }[] => {
  // Ordenar los usuarios según el volumen en orden descendente
  const sortedUsers = usersVolume.sort((a, b) => {
    const volumeA = new BigNumber(a.amount);
    const volumeB = new BigNumber(b.amount);
    return volumeB.minus(volumeA).toNumber();
  });

  // Obtener el top de usuarios según countToReturn
  const topUsers = sortedUsers.slice(0, countToReturn);

  return topUsers;
};
