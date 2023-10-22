import { selectedNetwork } from "@/config/network";
import { SorSwapResponse } from "@/types/ashswap.interface";
import { isValidNumber } from "@/utils/functions/validations";
import axiosAshswap from ".";

export const fetchAggregate = async ({
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
