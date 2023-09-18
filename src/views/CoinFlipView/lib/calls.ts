import { getSmartContractInteraction } from "@/services/sc";
import { IElrondToken } from "@/types/elrond.interface";
import { BooleanValue } from "@multiversx/sdk-core/out";
export const flipCoin = async (
  isHeads: boolean,
  token: IElrondToken,
  amount: string
) => {
  return await getSmartContractInteraction("flipWsp").ESDTTransfer({
    functionName: "flip",
    token: {
      collection: token.identifier,
      ...token,
    },
    arg: [new BooleanValue(isHeads)],
    value: Number(amount),
    gasL: 50000000,
  });
};
