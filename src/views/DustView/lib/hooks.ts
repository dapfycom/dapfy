import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";
import useGetUserTokens from "hooks/useGetUserTokens";
import { useAppSelector } from "hooks/useRedux";
import useSwr from "swr";
import { formatBalanceDolar } from "utils/functions/formatBalance";
import { limitDollarAmount, limitDollarAmountMin } from "./contants";
import { selectToTokenDust } from "./dust-slice";
import {
  fetchAllowedInputTokens,
  fetchAllowedOutputTokens,
  fetchAmountOut,
} from "./services";
export const useGetAllowedInputTokens = () => {
  const { data, isLoading, error } = useSwr(
    "dustWsp:getAllowedInputTokens",
    () => fetchAllowedInputTokens()
  );

  return {
    inputTokens: data || [],
    isLoading,
    error,
  };
};
export const useGetAllowedOutputTokens = () => {
  const { data, isLoading, error } = useSwr(
    "dustWsp:getAllowedOutputTokens",
    () => fetchAllowedOutputTokens()
  );

  return {
    outputTokens: data || [],
    isLoading,
    error,
  };
};
export const useGetAmountOut = (
  tokensOut: { identifier: string; balance: string }[]
) => {
  const selectedToToken = useAppSelector(selectToTokenDust);
  const { data, isLoading, error } = useSwr(
    tokensOut.length > 0
      ? ["dustWsp:getAmountOut:", selectedToToken, ...tokensOut]
      : null,
    () => fetchAmountOut(selectedToToken, tokensOut)
  );

  return {
    data: data,
    isLoading,
    error,
  };
};

export const useSelectableDustTokens = () => {
  const { isLoggedIn } = useGetLoginInfo();

  const { inputTokens, isLoading: isLoading1 } = useGetAllowedInputTokens();
  const toTokenToConvert = useAppSelector(selectToTokenDust);

  const { userTokens, isLoading: isLoading2 } = useGetUserTokens();

  const finalTokens = userTokens.filter((userToken) => {
    if (
      inputTokens.includes(userToken.identifier) &&
      userToken.identifier !== "EGLD" &&
      (formatBalanceDolar(userToken, userToken.price) as number) <=
        limitDollarAmount &&
      (formatBalanceDolar(userToken, userToken.price) as number) >=
        limitDollarAmountMin &&
      userToken.identifier !== toTokenToConvert
    ) {
      return true;
    } else {
      return false;
    }
  });

  return {
    finalTokens: isLoggedIn ? finalTokens : [],
    isLoading: isLoading1 || isLoading2,
  };
};
