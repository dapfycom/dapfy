import { selectedNetwork } from "config/network";
import { WspTypes } from "services/sc";

export const getScOfWrapedEgld = (shard: number): string => {
  switch (shard) {
    case 0:
      return selectedNetwork.scAddress.wrapEgld;
    case 1:
      return selectedNetwork.scAddress.wrapEgldShar1;
    case 2:
      return selectedNetwork.scAddress.wrapEgldShar2;

    default:
      return selectedNetwork.scAddress.wrapEgldShar1;
  }
};
export const getWspOfWrapedEgld = (shard: number): WspTypes => {
  switch (shard) {
    case 0:
      return "wrapEgldpWsp";
    case 1:
      return "wrapEgldpWspShard1";
    case 2:
      return "wrapEgldpWspShard2";

    default:
      return "wrapEgldpWspShard1";
  }
};

export const Base64toString = (base64String): string => {
  const decodedString = Buffer.from(base64String, "base64").toString("utf-8");
  return decodedString;
};

export const extractStringsBetweenAts = (input: string): string[] => {
  let baseString = input;
  if (baseString.startsWith("@")) {
    baseString = baseString.slice(1);
  }

  const parts = baseString.split("@");
  return parts.map((part) => {
    if (part === "") {
      return "0";
    }
    return part;
  });
};

export const convertToBoolean = (input: string | number): boolean => {
  if (input === "00" || input === "0" || input === "" || input === 0) {
    return false;
  } else if (input === "01" || input === "1" || input === 1) {
    return true;
  } else {
    throw new Error(`Input "${JSON.stringify(input)}" value not recognized`);
  }
};
