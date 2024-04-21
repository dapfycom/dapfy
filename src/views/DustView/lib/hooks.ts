import { selectedNetwork } from "@/config/network";
import useGetUserTokens from "@/hooks/useGetUserTokens";
import { useAppSelector } from "@/hooks/useRedux";
import { formatBalanceDollar } from "@/utils/functions/formatBalance";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";
import BigNumber from "bignumber.js";
import useSwr from "swr";
import {
  excludeTokens,
  limitDollarAmount,
  limitDollarAmountMin,
} from "./contants";
import { selectMaxTokensToConvert, selectToTokenDust } from "./dust-slice";
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
  const toTokens = data || [];
  return {
    outputTokens: toTokens.filter((t) => t !== selectedNetwork.tokensID.usdc),
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
    data: tokensOut.length > 0 ? data : undefined,
    isLoading,
    error,
  };
};

export const useSelectableDustTokens = () => {
  const { isLoggedIn } = useGetLoginInfo();
  const maxTokensLength = useAppSelector(selectMaxTokensToConvert);
  const { inputTokens, isLoading: isLoading1 } = useGetAllowedInputTokens();
  const toTokenToConvert = useAppSelector(selectToTokenDust);

  const { userTokens, isLoading: isLoading2 } = useGetUserTokens();

  const finalTokens1 = userTokens.filter((userToken) => {
    if (
      inputTokens.includes(userToken.identifier) &&
      userToken.identifier !== "EGLD" &&
      (formatBalanceDollar(userToken, userToken?.price || 0) as number) <=
        limitDollarAmount &&
      (formatBalanceDollar(userToken, userToken?.price || 0) as number) >=
        limitDollarAmountMin &&
      userToken.identifier !== toTokenToConvert &&
      userToken.identifier !== selectedNetwork.tokensID.busd
    ) {
      return true;
    } else {
      return false;
    }
  });

  const finalTokens2 = finalTokens1.filter(
    (token) => excludeTokens.includes(token.identifier) === false
  );

  const finalTokens = finalTokens2.sort((a, b) => {
    if (
      new BigNumber(a.balance)
        .dividedBy(10 ** a.decimals)
        .multipliedBy(a.price || 0)
        .isLessThan(
          new BigNumber(b.balance)
            .dividedBy(10 ** b.decimals)
            .multipliedBy(b.price || 0)
        )
    ) {
      return 1;
    }
    if (
      new BigNumber(a.balance)
        .dividedBy(10 ** a.decimals)

        .multipliedBy(a.price || 0)
        .isGreaterThan(
          new BigNumber(b.balance)
            .dividedBy(10 ** b.decimals)
            .multipliedBy(b.price || 0)
        )
    ) {
      return -1;
    }
    return 0;
  });

  return {
    finalTokens: isLoggedIn ? finalTokens.slice(0, maxTokensLength) : [],
    isLoading: isLoading1 || isLoading2,
  };
};
