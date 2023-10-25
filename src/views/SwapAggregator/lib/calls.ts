import { selectedNetwork } from "@/config/network";
import store from "@/redux/store";
import { getInterface, getSmartContractInteraction } from "@/services/sc";
import { SmartContractInteraction } from "@/services/sc/calls/transaction";
import { AggregatorStep, SorSwap } from "@/types/ashswap.interface";
import { getWspOfWrapedEgld } from "@/utils/functions/sc";
import { Address, TokenTransfer } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";

// export const submitSwap = async (
//   token_out: string,
//   final_amount_out: string,
//   swap_operations: SorSwap[],
//   token_for_swap: string,
//   amount_for_swap_decimals: string
// ) => {
//   console.log("token_out", token_out);
//   console.log("final_amount_out", final_amount_out);
//   console.log("swap_operations", swap_operations);
//   console.log("token_for_swap", token_for_swap);
//   console.log("amount_for_swap_decimals", amount_for_swap_decimals);
//   const transactions = [];
//   let swapToken = token_for_swap;
//   if (token_for_swap === selectedNetwork.tokensID.egld) {
//     swapToken = selectedNetwork.tokensID.wegld;
//     const shard = store.getState().dapp.shard;
//     const wrapedWsp = getWspOfWrapedEgld(shard);
//     console.log("wrapedWsp", wrapedWsp);
//     console.log(
//       " getInterface(wrapEgldpWspShard2).simpleAddress",
//       getInterface("wrapEgldpWspShard2").simpleAddress
//     );

//     // const t0 = await EGLDPaymentOnlyTx(wrapedWsp, "wrapEgld", fromToken.value);
//     const t0 = getSmartContractInteraction(wrapedWsp).EGLDPaymentOnlyTx({
//       functionName: "wrapEgld",
//       realValue: amount_for_swap_decimals,
//     });
//     transactions.push(t0);
//   }

//   const dataToSend: any[] = [
//     BytesValue.fromUTF8(token_out),
//     new BigUIntValue(new BigNumber(final_amount_out)),
//   ];

//   const datToSendWithSept: any[] = dataToSend.concat(
//     swap_operations.flatMap((step) => {
//       console.log(
//         "args",
//         step.arguments.map((arg) =>
//           Buffer.from(arg, "base64").toString("utf-8")
//         )
//       );

//       return [
//         BytesValue.fromUTF8(step.assetIn),
//         BytesValue.fromUTF8(step.assetOut),
//         new BigUIntValue(new BigNumber(step.amount)),
//         BytesValue.fromUTF8(step.poolId),
//         BytesValue.fromUTF8(step.functionName),
//         List.fromItems(
//           step.arguments.map((arg) =>
//             BytesValue.fromUTF8(Buffer.from(arg, "base64").toString("utf-8"))
//           )
//         ),
//       ];
//     })
//   );

//   const t1 = getSmartContractInteraction("aggregatorWsp").ESDTTransferOnlyTx({
//     functionName: "bestSwap",
//     arg: datToSendWithSept,
//     token: {
//       collection: swapToken,
//     },
//     realValue: amount_for_swap_decimals,
//     gasL: 600000000,
//   });

//   transactions.push(t1);

//   return await SmartContractInteraction.sendMultipleTransactions({
//     txs: transactions,
//   });
// };

export const submitSwap = async (
  token_out: string,
  final_amount_out: string,
  swap_operations: SorSwap[],
  token_for_swap: string,
  amount_for_swap_decimals: string
) => {
  console.log("token_out", token_out);
  console.log("final_amount_out", final_amount_out);
  console.log("swap_operations", swap_operations);
  console.log("token_for_swap", token_for_swap);
  console.log("amount_for_swap_decimals", amount_for_swap_decimals);

  const transactions = [];
  let swapToken = token_for_swap;
  if (token_for_swap === selectedNetwork.tokensID.egld) {
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
      realValue: amount_for_swap_decimals,
    });
    transactions.push(t0);
  }

  const tokensAmount = TokenTransfer.fungibleFromBigInteger(
    swapToken,
    amount_for_swap_decimals
  );

  const steps: AggregatorStep[] = swap_operations.map((s) => {
    const step: AggregatorStep = {
      token_in: s.assetIn,
      token_out: s.assetOut,
      amount_in: new BigNumber(s.amount),
      pool_address: s.poolId,
      function_name: s.functionName,
      arguments: s.arguments.map((arg) => Buffer.from(arg, "base64")),
    };
    return step;
  });

  const contactInteracation = getSmartContractInteraction("aggregatorWsp");

  const contract = contactInteracation.getContract();
  let interaction = contract.methods.bestSwap([
    token_out,
    final_amount_out,
    ...steps,
  ]);
  interaction
    .withSingleESDTTransfer(tokensAmount)
    .withSender(new Address(store.getState().dapp.userAddress));
  interaction
    .withGasLimit(20_000_000 + steps.length * 20_000_000)
    .withChainID(selectedNetwork.ChainID);

  const t1 = interaction.buildTransaction();
  transactions.push(t1);

  return await SmartContractInteraction.sendMultipleTransactions({
    txs: transactions,
  });
};
