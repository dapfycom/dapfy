import { getSmartContractInteraction } from "@/services/sc";
import { scQuery, scQueryByFieldsDefinitions } from "@/services/sc/queries";
import {
  BigUIntType,
  BigUIntValue,
  CompositeType,
  TokenIdentifierType,
  TokenIdentifierValue,
  VariadicType,
  VariadicValue,
} from "@multiversx/sdk-core/out";
import { SendTransactionReturnType } from "@multiversx/sdk-dapp/types";
import BigNumber from "bignumber.js";
export const fetchAllowedInputTokens = async (): Promise<string[]> => {
  const res: any = await scQuery("dustWsp", "getAllowedInputTokens");

  const { firstValue } = res;
  const data = firstValue?.valueOf();

  return data;
};
export const fetchAllowedOutputTokens = async (): Promise<string[]> => {
  const res: any = await scQuery("dustWsp", "getAllowedOutputTokens");

  const { firstValue } = res;
  const data = firstValue?.valueOf();

  return data;
};
export const fetchAmountOut = async (
  tokenIOut: string,
  tokensToSwipe: { identifier: string; balance: string }[]
): Promise<{ tokenIdentifier: string; amountOut: string }> => {
  const dataToSend: any[] = tokensToSwipe.flatMap((item) => {
    return [
      new TokenIdentifierValue(item.identifier),
      new BigUIntValue(new BigNumber(item.balance)),
    ];
  });

  const dataFields = [
    ["tokenIdentifier", "TokenIdentifier"],
    ["amountOut", "BigUint"],
  ];

  const parsed = await scQueryByFieldsDefinitions(
    "dustWsp",
    "getAmountOut",
    [
      new TokenIdentifierValue(tokenIOut),
      new VariadicValue(
        new VariadicType(
          new CompositeType(new TokenIdentifierType(), new BigUIntType())
        ),
        dataToSend
      ),
    ],
    dataFields
  );

  const scdata: any = {
    tokenIdentifier: "",
    amountOut: new BigNumber(0),
  };

  // @ts-ignore
  parsed.forEach((item, index) => {
    scdata[dataFields[index][0]] = item.valueOf();
  });
  const newData = {
    tokenIdentifier: scdata.tokenIdentifier,
    amountOut: (scdata.amountOut as BigNumber).toString(),
  };

  return newData;
};

// calls
export const convertTokens = async (
  tokenToReceive: string,
  minAmountToReceive: string | number,
  tokensToSend: {
    collection: string;
    nonce: number;
    value: string | number;
    decimals?: number;
  }[]
): Promise<SendTransactionReturnType> => {
  const res = await getSmartContractInteraction("dustWsp").MultiESDTNFTTransfer(
    {
      functionName: "swipe",
      tokens: tokensToSend,
      arg: [
        new TokenIdentifierValue(tokenToReceive),
        new BigUIntValue(new BigNumber(minAmountToReceive)),
      ],
      gasL: tokensToSend.length * 30000000,
    }
  );

  return res;
};
