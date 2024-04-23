import { getSmartContractInteraction } from "@/services/sc";
import { EsdtPayment } from "@/types/elrond.interface";
import { U64Value } from "@multiversx/sdk-core/out";
import { SendTransactionReturnType } from "@multiversx/sdk-dapp/types";

export const mintJeeter = async (
  payment: EsdtPayment,
  amountToMint: number
): Promise<SendTransactionReturnType> => {
  return await getSmartContractInteraction("mintJeeterWsp").ESDTTransfer({
    functionName: "mint",
    token: {
      collection: payment.token_identifier,
    },
    realValue: payment.amount,
    arg: [new U64Value(amountToMint)],
    gasL: 100000000,
  });
};
