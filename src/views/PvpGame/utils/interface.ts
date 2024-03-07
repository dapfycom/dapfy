import { Address } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";

export interface IScUserInfo {
  games_created: BigNumber;
  games_challenged: BigNumber;
  games_won: BigNumber;
  games_lost: BigNumber;
  username: Buffer;
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
