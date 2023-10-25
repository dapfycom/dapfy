import { selectedNetwork } from "@/config/network";
import store from "@/redux/store";
import { fetchElrondData } from "@/services/rest/elrond";
import { IRoute } from "@/types/swap.interface";
import {
  getRealBalance,
  setElrondBalance,
} from "@/utils/functions/formatBalance";
import BigNumber from "bignumber.js";
import { IElrondToken, IMexPair } from "../../../types/elrond.interface";

// Delete all this
export const handleSwap = (value: string, rate: number) => {
  let value1 = "";
  let value2 = "";
  if (value === "") {
    value1 = "";
    value2 = "";
  } else {
    value1 = value;
    value2 = (Number(value) * rate).toString();
  }

  return { value1, value2 };
};

export const getSwapPairs = async (
  token1: string,
  token2: string,
  pairs: IMexPair[]
) => {
  const swapPairs: IMexPair[] = [];

  let firstSwapPair: {
    pair?: IMexPair;
    type: "wegld" | "usdc" | "wegld-usdc";
  } = {
    pair: undefined,
    type: "wegld",
  };
  let lastSwapPair: IMexPair | null = null;
  const usdcWegldPair = pairs.find(
    (pair) => pair.baseId === "WEGLD-bd4d79" && pair.quoteId === "USDC-c76f1f"
  );
  pairs.forEach((pair) => {
    if (token1 !== "WEGLD-bd4d79" && token1 !== "USDC-c76f1f") {
      // if is a wegld token
      if (pair.quoteId === "WEGLD-bd4d79") {
        if (pair.baseId === token1) {
          firstSwapPair = {
            pair: pair,
            type: "wegld",
          };
        }
      }
      // if is a usdc token
      if (pair.baseId === "USDC-c76f1f") {
        if (pair.quoteId === token1) {
          firstSwapPair = {
            pair: pair,
            type: "usdc",
          };
        }
      }
      // if usdc - wegld
      if (pair.quoteId === "USDC-c76f1f" && pair.baseId === "WEGLD-bd4d79") {
        firstSwapPair = {
          pair: pair,
          type: "wegld-usdc",
        };
      }
    } else {
      // firstSwapPair = {
      //   pair: usdcWegldPair,
      //   type: "wegld-usdc",
      // };
      // the token1 is wegld (pure) or usdc (pure)
      if (pair.quoteId === "WEGLD-bd4d79") {
        // wegld(pure) - wegld(token)
        if (pair.baseId === token2 && pair.quoteId === token1) {
          firstSwapPair = {
            pair: pair,
            type: "wegld",
          };
        }
      } else {
        if (pair.baseId === "USDC-c76f1f") {
          // usdc(pure) - usdc(token)
          if (pair.quoteId === token2 && pair.baseId === token1) {
            firstSwapPair = {
              pair: pair,
              type: "usdc",
            };
          }
        } else {
          firstSwapPair = {
            pair: usdcWegldPair,
            type: "wegld-usdc",
          };
        }
      }
    }
  });
  pairs.forEach((pair) => {
    if (pair.quoteId === "WEGLD-bd4d79") {
      if (pair.baseId === token2) {
        lastSwapPair = pair;
      }
    }
    if (pair.baseId === "USDC-c76f1f") {
      if (pair.quoteId === token2) {
        lastSwapPair = pair;
      }
    }
  });

  // if is a direct wegld or usdc swap
  if (
    token1 === "WEGLD-bd4d79" ||
    token2 === "WEGLD-bd4d79" ||
    token1 === "USDC-c76f1f" ||
    token2 === "USDC-c76f1f"
  ) {
    if (firstSwapPair?.type === "wegld-usdc" && lastSwapPair) {
      return [firstSwapPair.pair, lastSwapPair];
    } else {
      return [firstSwapPair.pair];
    }
  }

  if (firstSwapPair && lastSwapPair) {
    const posibleBridgePair = pairs.filter((pair) => {
      if (firstSwapPair?.pair?.quoteId === "WEGLD-bd4d79") {
        if (firstSwapPair.pair.quoteId === pair.quoteId) {
          return true;
        }
      } else {
        if (firstSwapPair?.pair?.baseId === pair.baseId) {
          return true;
        }
      }

      return false;
    });
    let bridgePair: IMexPair | undefined = posibleBridgePair.find((pair) => {
      if (lastSwapPair?.quoteId === "WEGLD-bd4d79") {
        if (lastSwapPair.baseId === pair.baseId) {
          return true;
        }
      } else {
        if (lastSwapPair?.quoteId === pair.quoteId) {
          return true;
        }
      }
      return false;
    });
    if (bridgePair) {
      if (firstSwapPair.pair) {
        swapPairs.push(firstSwapPair.pair);
        swapPairs.push(bridgePair);
      }
    } else {
      if (firstSwapPair.pair && bridgePair) {
        bridgePair = usdcWegldPair;
        swapPairs.push(firstSwapPair.pair);
        // swapPairs.push(bridgePair);
        swapPairs.push(lastSwapPair);
      }
    }
  }

  return swapPairs;
};

export const smartSwapRoutes = async ([
  tokenParam1,
  tokenParam2,
  token1Amount,
  mexPairs,
]: [string, string, string, IMexPair[]]): Promise<IRoute[]> => {
  let token1 = tokenParam1;
  let token2 = tokenParam2;
  if (token1 === selectedNetwork.tokensID.egld) {
    token1 = selectedNetwork.tokensID.wegld;
  }
  if (token2 === selectedNetwork.tokensID.egld) {
    token2 = selectedNetwork.tokensID.wegld;
  }

  const pairs = await getSwapPairs(token1, token2, mexPairs);

  let token1Before = token1;
  let amount1Before = token1Amount;
  const tokensDeciamals = await fetchElrondData<
    {
      decimals: number;
      identifier: string;
    }[]
  >(
    `/tokens?identifiers=${pairs
      .map((p) => {
        if (p?.quoteId === "WEGLD-bd4d79") {
          return p.baseId;
        } else {
          return p?.quoteId;
        }
      })
      .join(",")}`
  );

  const routes: IRoute[] = [];
  for (let index = 0; index < pairs.length; index++) {
    const pair = pairs[index];
    let t1: string | undefined;
    let t2: string | undefined;
    let rate = 0;

    if (token1Before === pair?.baseId) {
      //wegld route
      t1 = pair.baseId;
      t2 = pair.quoteId;

      rate = new BigNumber(pair.basePrice).div(pair.quotePrice).toNumber();
    } else {
      //usdc route
      t1 = pair?.quoteId;
      t2 = pair?.baseId;
      rate = new BigNumber(pair?.quotePrice || 0)
        .div(pair?.basePrice || 1)
        .toNumber();
    }

    const { decimals: token1Decimals } = tokensDeciamals.find(
      (t) => t.identifier === t1
    ) || { decimals: 18 };
    const { decimals: token2Decimals } = tokensDeciamals.find(
      (t) => t.identifier === t2
    ) || { decimals: 18 };
    const finalAmount1 = amount1Before;

    const bigNtoken1 = getRealBalance(finalAmount1, token1Decimals, true);
    const finalAmount2 = new BigNumber(bigNtoken1)
      .multipliedBy(rate)
      .multipliedBy(Math.pow(10, token2Decimals))
      .toFixed(0);

    const data: IRoute = {
      token1: t1 || "",
      token2: t2 || "",
      token1Amount: getRealBalance(finalAmount1, token1Decimals) as number,
      token2Amount: getRealBalance(finalAmount2, token2Decimals) as number,
      token1AmountDecimals: finalAmount1,
      token2AmountDecimals: finalAmount2,
      sc: pair?.address || "",
    };

    token1Before = t2 || "";
    amount1Before = finalAmount2;
    routes.push(data);
  }

  return routes;
};

// New - No delete
export const changeField = (
  value: string,
  onChangeFieldValue: (value: string) => {
    payload: string;
    type: string;
  },
  onChangeFieldValueDecimals: (valueDecimals: string) => {
    payload: string;
    type: string;
  },
  token?: IElrondToken
) => {
  if (token) {
    store.dispatch(onChangeFieldValue(value));
    console.log("token in changeField", token);

    const valueDecimals = setElrondBalance(value, token.decimals);
    console.log("valueDecimals", valueDecimals);

    store.dispatch(onChangeFieldValueDecimals(valueDecimals.toString()));
  }
};
