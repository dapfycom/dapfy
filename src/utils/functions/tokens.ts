import { fetchTokenById } from "@/services/rest/elrond/tokens";
import BigNumber from "bignumber.js";
import toHex from "to-hex";

export const formatTokenI = (tokenIdentifier: string): string => {
  if (!tokenIdentifier) {
    return "";
  }

  return tokenIdentifier.split("-")[0];
};

export const createIndentifierByCollectionAndNonce = (
  collection: string,
  nonce: number
): string => {
  let newNonce = toHex(nonce, { evenLength: true });

  return collection + "-" + newNonce;
};

// slipapge is % number like 1% or 5%
export const calculateSlipageAmount = (
  slipapge: number,
  aproxAmount: string | number | BigNumber
): BigNumber => {
  const amountWithSlipage = new BigNumber(aproxAmount)
    .multipliedBy(slipapge)
    .dividedBy(100);

  const finalAmount = new BigNumber(aproxAmount).minus(amountWithSlipage);

  return finalAmount;
};

export const getTokensByDollarAmount = async (
  tokenId: string,
  dollarAmount: number
): Promise<number> => {
  const mxToken = await fetchTokenById(tokenId);
  const tokenPice = mxToken.price;
  const tokens = dollarAmount / tokenPice;

  if (process.env.NODE_ENV === "development") {
    return dollarAmount * 10000;
  }
  return tokens;
};
