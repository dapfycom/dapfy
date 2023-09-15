import useGetMaiarPairs from "@/hooks/useGetMaiarPairs";
import useGetToken1AndToken2OfLpToken from "@/hooks/useGetToken1AndToken2OfLpToken";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { IElrondToken } from "@/types/elrond.interface";
import { formatBalanceDolar } from "@/utils/functions/formatBalance";
import BigNumber from "bignumber.js";
import { useEffect } from "react";
import useSWR from "swr";
import { smartSwapRoutes } from "./functions";
import {
  onChangeToField,
  selectFromFieldSelectedToken,
  selectFromFieldValueDecimals,
  selectToFieldSelectedToken,
} from "./swap-slice";
import {
  onChangeToField as onChangeSwapLpToField,
  selectFromField,
  selectToField,
} from "./swapLp-slice";
export const useGetSwapRate = () => {
  const token1 = useAppSelector(selectFromFieldSelectedToken);
  const token2 = useAppSelector(selectToFieldSelectedToken);
  const token1Value = useAppSelector(selectFromFieldValueDecimals);
  const dispatch = useAppDispatch();
  const { pairs } = useGetMaiarPairs();
  const { data, isLoading, error } = useSWR(
    token1 && token2 && token1Value
      ? [token1, token2, token1Value, pairs]
      : null,
    smartSwapRoutes
  );

  useEffect(() => {
    if (data) {
      dispatch(onChangeToField(data[data.length - 1].token2Amount.toString()));
    }
  }, [data, dispatch]);

  return {
    data,
    isLoading,
    error,
  };
};

export const useSearchToken = (tokens: IElrondToken[], searchKey: string) => {
  let filteredTokens: IElrondToken[] = [];

  if (searchKey === "") {
    filteredTokens = tokens;
  } else {
    filteredTokens = tokens.filter((token) => {
      return (
        token.ticker.toString().toLowerCase().indexOf(searchKey.toLowerCase()) >
        -1
      );
    });
  }
  return filteredTokens;
};

export const useSwapLpRate = () => {
  const fromField = useAppSelector(selectFromField);
  const toField = useAppSelector(selectToField);
  const dispatch = useAppDispatch();
  const { pairs } = useGetMaiarPairs();
  const { token1, token2 } = useGetToken1AndToken2OfLpToken(
    toField.selectedToken,
    fromField.selectedToken
  );
  const { data, isLoading, error } = useSWR(
    fromField.selectedToken && toField.selectedToken && fromField.value
      ? [
          token1,
          token2,
          new BigNumber(fromField.valueDecimals).div(2).toNumber(),
          pairs,
        ]
      : null,
    smartSwapRoutes
  );

  const pair = pairs?.find((p) => p.id === toField.selectedToken);

  useEffect(() => {
    if (pair && data) {
      const swapInfo = data[0];
      const token1TokenDollarAmount = new BigNumber(
        formatBalanceDolar(
          { balance: swapInfo.token1Amount, decimals: 0 },
          pair.baseId === swapInfo.token1 ? pair.basePrice : pair.quotePrice,
          false
        )
      ).toNumber();
      const lpAmount = new BigNumber(token1TokenDollarAmount)
        .div(pair?.price || 0)
        .toNumber();
      dispatch(onChangeSwapLpToField(lpAmount.toString()));
    }
  }, [data, dispatch, pair]);

  return {
    data: data || [],
    isLoading,
    error,
  };
};
