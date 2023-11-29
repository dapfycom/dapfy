import { selectedNetwork } from "@/config/network";
import { SorSwapResponse } from "@/types/ashswap.interface";
import { isValidNumber } from "@/utils/functions/validations";
import axiosAshswap from ".";
import { Aggregator, ChainId } from "@ashswap/ash-sdk-js";

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

  const integrator =
    "erd1085h6wdckzfkvfftq837mwt2a780dv0p8wcjjpauku7at0dlqswszewvjn"; // your fee wallet address

  const agService = new Aggregator({
    chainId: selectedNetwork.ChainID as ChainId.Mainnet | ChainId.Devnet,
    protocol: integrator,
  });

  console.log({
    fromToken: from,
    toToken: to,
    amount: amount,
  });

  const sorswap = await agService.getPaths(from, to, amount);
  console.log("sorswap", sorswap);

  return sorswap;
};
