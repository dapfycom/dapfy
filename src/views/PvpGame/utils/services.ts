import { getSmartContractInteraction } from "@/services/sc";
import {
  BytesType,
  BytesValue,
  OptionType,
  OptionValue,
} from "@multiversx/sdk-core/out";

export const createGame = (username?: string) => {
  getSmartContractInteraction("pvpWsp").ESDTorEGLDTransfer({
    functionName: "create_game",
    token: {
      collection: "EGLD",
    },
    arg: [
      new OptionValue(
        new OptionType(new BytesType()),
        BytesValue.fromUTF8("francisco36")
      ),
    ],
    value: 0.1,
    gasL: 100_000_000,
  });
};
