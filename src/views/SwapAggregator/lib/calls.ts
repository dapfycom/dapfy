import { selectedNetwork } from "@/config/network";
import store from "@/redux/store";
import { getInterface, getSmartContractInteraction } from "@/services/sc";
import { SmartContractInteraction } from "@/services/sc/calls/transaction";
import { SorSwap } from "@/types/ashswap.interface";
import { getWspOfWrapedEgld } from "@/utils/functions/sc";
import { BigUIntValue, BytesValue, List } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";

export const submitSwap = async (
  token_out: string,
  final_amount_out: string,
  swap_operations: SorSwap[]
) => {
  const dataToSend: any[] = [
    BytesValue.fromUTF8(token_out),
    new BigUIntValue(new BigNumber(final_amount_out)),
  ];

  const datToSendWithSept: any[] = dataToSend.concat(
    swap_operations.flatMap((step) => {
      return [
        BytesValue.fromUTF8(step.assetIn),
        BytesValue.fromUTF8(step.assetOut),
        new BigUIntValue(new BigNumber(step.amount)),
        BytesValue.fromUTF8(step.poolId),
        BytesValue.fromUTF8(step.functionName),
        List.fromItems(step.arguments.map((arg) => BytesValue.fromUTF8(arg))),
      ];
    })
  );

  const transactions = [];
  let swapToken = token_out;
  if (token_out === selectedNetwork.tokensID.egld) {
    swapToken = selectedNetwork.tokensID.wegld;
    const shard = store.getState().dapp.shard;
    const wrapedWsp = getWspOfWrapedEgld(shard);
    console.log("wrapedWsp", wrapedWsp);
    console.log(
      " getInterface(wrapEgldpWspShard2).simpleAddress",
      getInterface("wrapEgldpWspShard2").simpleAddress
    );

    // const t0 = await EGLDPaymentOnlyTx(wrapedWsp, "wrapEgld", fromToken.value);
    const t0 = getSmartContractInteraction(wrapedWsp).EGLDPaymentOnlyTx({
      functionName: "wrapEgld",
      value: final_amount_out,
    });
    transactions.push(t0);
  }

  const t1 = getSmartContractInteraction("aggregatorWsp").scCallOnlyTx({
    functionName: "bestSwap",
    arg: datToSendWithSept,

    gasL: 600000000,
  });

  transactions.push(t1);

  return await SmartContractInteraction.sendMultipleTransactions({
    txs: transactions,
  });
};
