import { getSmartContractInteraction } from "@/services/sc";
import { scQuery } from "@/services/sc/queries";
import {
  Address,
  AddressValue,
  BytesValue,
  U32Value,
} from "@multiversx/sdk-core/out";
import { adaptGame, adaptGamesWithUserInfo, adaptUserInfo } from "./adapters";

// sc calls
export const createGame = (
  amount: number,
  tokenIdentifier: string = "EGLD",
  decimals: number = 18,
  username?: string
) => {
  const args = [];

  if (username) {
    args.push(BytesValue.fromUTF8(username));
  }
  getSmartContractInteraction("pvpWsp").ESDTorEGLDTransfer({
    functionName: "create_game",
    token: {
      collection: tokenIdentifier,
      decimals: decimals,
    },
    arg: args,
    value: amount,
    gasL: 80_000_000,
  });
};

// sc queries

export const fetchGameById = async (gameId: number) => {
  const res = await scQuery("pvpWsp", "getGameById", [new U32Value(gameId)]);

  return adaptGame(res?.firstValue?.valueOf());
};

export const fetchActiveGames = async () => {
  const res = await scQuery("pvpWsp", "getActiveGames");

  return adaptGamesWithUserInfo(res?.firstValue?.valueOf());
};

export const fetchUserInfo = async (address: string) => {
  const res = await scQuery("pvpWsp", "getUserInfo", [
    new AddressValue(new Address(address)),
  ]);

  return adaptUserInfo(res?.firstValue?.valueOf());
};

export const fetchUserEarnings = async (address: string) => {
  const res = await scQuery("pvpWsp", "getUserEarnings", [
    new AddressValue(new Address(address)),
  ]);

  return res?.firstValue?.valueOf().toString();
};
