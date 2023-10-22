import { useAppSelector } from "@/hooks/useRedux";
import { fetchAggregatorData } from "@/services/rest/ash";
import { fetchAggregate } from "@/services/rest/ash/aggregate";
import { AshToken } from "@/types/ashswap.interface";
import { IElrondToken } from "@/types/elrond.interface";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import {
  onChangeToField,
  onChangeToFieldValueDecimals,
  selectFromFieldSelectedToken,
  selectFromFieldValueDecimals,
  selectToFieldSelectedToken,
} from "./swap-slice";
export const useGetAggregate = () => {
  const token1 = useAppSelector(selectFromFieldSelectedToken);
  const token2 = useAppSelector(selectToFieldSelectedToken);
  const token1Value = useAppSelector(selectFromFieldValueDecimals);
  const dispatch = useDispatch();
  console.log({ token1 }, { token2 }, { token1Value });

  const { data, isLoading, error } = useSWR(
    token1 && token2 && token1Value
      ? ["aggregate", token1, token2, token1Value]
      : null,
    async () => {
      const res = await fetchAggregate({
        from: token1,
        to: token2,
        amount: token1Value,
      });
      return res;
    }
  );

  useEffect(() => {
    if (data?.returnAmount) {
      dispatch(onChangeToField(data.returnAmount));
      dispatch(onChangeToFieldValueDecimals(data.returnAmountWithDecimal));
    }
  }, [
    data?.tokenOut,
    data?.returnAmount,
    data?.returnAmountWithDecimal,
    dispatch,
  ]);

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

export const useGetSwapbleAggregatorTokens = () => {
  const { data, error, isLoading } = useSWR<AshToken[]>(
    "/tokens",
    fetchAggregatorData
  );

  return {
    ashTokens: data || [],
    error,
    isLoading,
  };
};
