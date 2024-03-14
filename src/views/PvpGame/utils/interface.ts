import { Address } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";

export interface IScUserInfo {
  games_created: BigNumber;
  games_challenged: BigNumber;
  games_won: BigNumber;
  games_lost: BigNumber;
  username: Buffer;
  profile_url: Buffer;
}

export interface IScGameInfo {
  id: BigNumber;
  amount: BigNumber;
  token_identifier: string;
  user_creator: Address;
  user_challenger: Address;
  status: {
    name: "Created" | "Finished" | "Canceled";
    fields: [];
  };
  winner: Address;
  date: BigNumber;
}

export interface IGameInfo {
  id: number;
  amount: string;
  token_identifier: string;
  user_creator: string;
  user_challenger: string;
  status: "Created" | "Finished" | "Canceled";
  winner: string;
  date: number;
}

export interface IUserInfo {
  games_created: number;
  games_challenged: number;
  games_won: number;
  games_lost: number;
  username: string;
  profile_url: string;
}

export interface IGameWithUserInfo {
  game: IGameInfo | undefined;
  user_creator: IUserInfo | undefined;
  user_challenger: IUserInfo | undefined;
}

export interface IUserInHistory {
  address: string;
  username: string;
  profile_url: string;
}

export interface IHistoryData {
  gameId: number;
  creator: IUserInHistory;
  challenger: IUserInHistory;
  winner: IUserInHistory;
  txHash: string;
  date: number;
}

export interface IScGamePayment {
  amount: BigNumber;
  token_identifier: string;
}

export interface IGamePayment {
  amount: string;
  token_identifier: string;
}
