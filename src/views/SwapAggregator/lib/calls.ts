import { selectedNetwork } from "@/config/network";
import store from "@/redux/store";
import { getSmartContractInteraction } from "@/services/sc";
import { SmartContractInteraction } from "@/services/sc/calls/transaction";
import { AggregatorStep, SorSwap } from "@/types/ashswap.interface";
import { getWspOfWrapedEgld } from "@/utils/functions/sc";
import { SorSwapResponse } from "@ashswap/ash-sdk-js/out";
import { Address, TokenTransfer } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import { agService } from "./constants";

export const submitSwapOld = async (
  token_out: string,
  final_amount_out: string,
  swap_operations: SorSwap[],
  token_for_swap: string,
  amount_for_swap_decimals: string
) => {
  const transactions = [];
  let swapToken = token_for_swap;
  if (token_for_swap === selectedNetwork.tokensID.egld) {
    swapToken = selectedNetwork.tokensID.wegld;
    const shard = store.getState().dapp.shard;
    const wrapedWsp = getWspOfWrapedEgld(shard);

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
export const submitSwap = async (
  sorswap: SorSwapResponse,
  slippage: number
) => {
  if (!sorswap) throw new Error(`Could not find any paths for EGLD to ASH`);
  const transactions = [];

  // @ts-ignore
  if (sorswap.__from === selectedNetwork.tokensID.egld) {
    const shard = store.getState().dapp.shard;
    const wrapedWsp = getWspOfWrapedEgld(shard);

    // const t0 = await EGLDPaymentOnlyTx(wrapedWsp, "wrapEgld", fromToken.value);
    const t0 = getSmartContractInteraction(wrapedWsp).EGLDPaymentOnlyTx({
      functionName: "wrapEgld",
      realValue: sorswap.swapAmountWithDecimal,
    });
    transactions.push(t0);
  }

  const interaction = await agService.aggregateFromPaths(
    sorswap,
    slippage * 100,
    () => Promise.resolve(true)
  );

  const tx1 = interaction
    .withSender(new Address(store.getState().dapp.userAddress))
    .check()
    .buildTransaction();
  transactions.push(tx1);

  return await SmartContractInteraction.sendMultipleTransactions({
    txs: transactions as any,
  });
};
