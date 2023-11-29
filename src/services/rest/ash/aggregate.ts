import { selectedNetwork } from "@/config/network";
import { isValidNumber } from "@/utils/functions/validations";
import { agService } from "@/views/SwapAggregator/lib/constants";
import { SorSwapResponse } from "@ashswap/ash-sdk-js/out";
import axiosAshswap from ".";

export const fetchAggregateOld = async ({
  from,
  to,
  amount,
}: {
  from: string;
  to: string;
  amount: string;
}): Promise<SorSwapResponse> => {
  if (!isValidNumber(amount)) {
    throw new Error("Invalid amount");
  }

  const fromTokenI =
    from === selectedNetwork.tokensID.egld
      ? selectedNetwork.tokensID.wegld
      : from;
  const toTokenI =
    to === selectedNetwork.tokensID.egld ? selectedNetwork.tokensID.wegld : to;

  const res = await axiosAshswap.get<SorSwapResponse>("/aggregate", {
    params: {
      from: fromTokenI,
      to: toTokenI,
      amount,
    },
  });
  return res.data;
};
export const fetchAggregate = async ({
  from,
  to,
  amount,
}: {
  from: string;
  to: string;
  amount: string;
}): Promise<SorSwapResponse | undefined> => {
  if (!isValidNumber(amount)) {
    throw new Error("Invalid amount");
  }

  console.log({
    fromToken: from,
    toToken: to,
    amount: amount,
  });

  const sorswap = await agService.getPaths(from, to, amount);
  console.log("sorswap", sorswap);

  return sorswap;
};
