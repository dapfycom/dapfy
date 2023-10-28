import { selectedNetwork } from "@/config/network";
import store from "@/redux/store";
import { getSmartContractInteraction } from "@/services/sc";
import { SmartContractInteraction } from "@/services/sc/calls/transaction";
import { IElrondToken } from "@/types/elrond.interface";
import { IRoute } from "@/types/swap.interface";
import { getWspOfWrapedEgld } from "@/utils/functions/sc";
import { calculateSlipageAmount } from "@/utils/functions/tokens";
import {
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
  Transaction,
} from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";

export const submitSwap = async (
  swapInfo: IRoute[],
  slipapge: number,
  fromToken: {
    token: string;
    value: number;
  },

  fromElrondToken: IElrondToken
) => {
  let swapToken = fromToken.token;

  const dataToSend = swapInfo.flatMap((item) => {
    const finalAmount = calculateSlipageAmount(
      slipapge,
      item.token2AmountDecimals
    ).toFixed(0);

    return [
      new AddressValue(new Address(item.sc)),
      BytesValue.fromUTF8("swapTokensFixedInput"),
      BytesValue.fromUTF8(item.token2),
      new BigUIntValue(new BigNumber(finalAmount)),
    ];
  });

  const transactions = [];

  if (fromToken.token === selectedNetwork.tokensID.egld) {
    swapToken = selectedNetwork.tokensID.wegld;
    const shard = store.getState().dapp.shard;
    const wrapedWsp = getWspOfWrapedEgld(shard);

    // const t0 = await EGLDPaymentOnlyTx(wrapedWsp, "wrapEgld", fromToken.value);
    const t0 = getSmartContractInteraction(wrapedWsp).EGLDPaymentOnlyTx({
      functionName: "wrapEgld",
      value: fromToken.value,
    });
    transactions.push(t0);
  }

  // is user is going to swap 2 tokens
  const t1 = getSmartContractInteraction("maiarRouterWsp").ESDTTransferOnlyTx({
    functionName: "multiPairSwap",
    token: {
      collection: swapToken,
      decimals: fromElrondToken.decimals,
    },
    arg: dataToSend,

    gasL: 120000000,
    realValue: swapInfo[0].token1AmountDecimals,
  });

  transactions.push(t1);

  return await SmartContractInteraction.sendMultipleTransactions({
    txs: transactions,
  });
};

export const lpSwap = async (
  routes: IRoute[],
  fromToken: {
    value: string;
    selectedToken: string;
  },
  slipapge = 1
) => {
  const swapInfo = routes[0];
  if (swapInfo) {
    let token1 = fromToken.selectedToken;

    const transactions = [];

    if (fromToken.selectedToken === selectedNetwork.tokensID.egld) {
      token1 = selectedNetwork.tokensID.wegld;
      //wrap egld
      const shard = store.getState().dapp.shard;
      const wspWrapEgld = getWspOfWrapedEgld(shard);

      const wrapTx = getSmartContractInteraction(wspWrapEgld).EGLDPaymentOnlyTx(
        {
          functionName: "wrapEgld",
          value: Number(fromToken.value),
          gasL: 30000000,
        }
      );

      transactions.push(wrapTx);
    }

    const amountWithSlipage = new BigNumber(swapInfo.token2AmountDecimals)
      .multipliedBy(slipapge)
      .dividedBy(100)
      .toNumber();

    const finalAmount = new BigNumber(swapInfo.token2AmountDecimals)
      .minus(amountWithSlipage)
      .toFixed(0);

    const splitTx: Transaction = getSmartContractInteraction(
      // @ts-ignore
      swapInfo.sc
    ).ESDTTransferOnlyTx({
      functionName: "swapTokensFixedInput",
      token: {
        collection: token1,
        decimals: 0,
      },
      arg: [
        BytesValue.fromUTF8(swapInfo.token2),
        new BigUIntValue(new BigNumber(finalAmount)),
      ],
      gasL: 100000000,
      realValue: swapInfo.token1AmountDecimals,
    });

    transactions.push(splitTx);

    // addLiquidity tx
    const tokens = [
      {
        collection: swapInfo.token2,
        nonce: 0,
        value: swapInfo.token2AmountDecimals,
      },
      {
        collection: swapInfo.token1,
        nonce: 0,
        value: swapInfo.token1AmountDecimals,
      },
    ];

    const token1SlippagePercent = new BigNumber(swapInfo.token1AmountDecimals)
      .multipliedBy(slipapge)
      .dividedBy(100)
      .toNumber();
    const finalToken1Amount = new BigNumber(swapInfo.token1AmountDecimals)
      .minus(token1SlippagePercent)
      .toFixed(0);

    //token2_amount_min
    const token2SlippagePercent = new BigNumber(swapInfo.token2AmountDecimals)
      .multipliedBy(slipapge)
      .dividedBy(100)
      .toNumber();
    const finalToken2Amount = new BigNumber(swapInfo.token2AmountDecimals)
      .minus(token2SlippagePercent)
      .toFixed(0);

    const lpSwapArg = [
      new BigUIntValue(new BigNumber(finalToken2Amount)),
      new BigUIntValue(new BigNumber(finalToken1Amount)),
    ];

    const lpTx: Transaction = getSmartContractInteraction(
      // @ts-ignore
      swapInfo.sc
    ).MultiESDTNFTTransferOnlyTx({
      functionName: "addLiquidity",
      tokens: tokens.map((t) => {
        return {
          collection: t.collection,
          nonce: t.nonce,
          value: Number(t.value),
        };
      }),
      arg: lpSwapArg,
      gasL: 120000000,
    });

    transactions.push(lpTx);

    return await SmartContractInteraction.sendMultipleTransactions({
      txs: transactions,
    });
  }
};
