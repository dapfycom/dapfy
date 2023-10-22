"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SwapIcon } from "@/components/ui-system/icons/ui-icons";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { IElrondAccountToken } from "@/types/elrond.interface";
import { formatBalance } from "@/utils/functions/formatBalance";
import {
  changeFromFieldToken,
  changeToFieldToken,
  onChageFromFieldValue,
  onChageFromFieldValueDecimals,
  onChangeToField,
  onChangeToFieldValueDecimals,
  onSwapFields,
  selectFromField,
  selectToField,
} from "@/views/SwapAggregator/lib/swap-slice";
import { changeField } from "../../lib/functions";
import { useGetAggregate } from "../../lib/hooks";
import InputBox from "./commons/InputBox";
import SubmitButton from "./commons/SubmitButton";
import SwapInfo from "./commons/SwapInfo/SwapInfo";

const SwapCard = () => {
  const fromField = useAppSelector(selectFromField);
  const toField = useAppSelector(selectToField);
  const { isLoading: loadingAggregatorData } = useGetAggregate();
  const dispatch = useAppDispatch();
  const handleChangeFromField = (
    e: React.ChangeEvent<HTMLInputElement>,
    token?: IElrondAccountToken
  ) => {
    console.log({ token });

    changeField(
      e.target.value,
      onChageFromFieldValue,
      onChageFromFieldValueDecimals,
      token
    );
  };
  const handleChangeToField = (
    e: React.ChangeEvent<HTMLInputElement>,
    token?: IElrondAccountToken
  ) => {
    changeField(
      e.target.value,
      onChangeToField,
      onChangeToFieldValueDecimals,
      token
    );
  };
  const swapFileds = () => {
    console.log("swapFileds", swapFileds);

    dispatch(onSwapFields());
  };

  const handleChangeFromToken = (token: string) => {
    dispatch(changeFromFieldToken(token));
  };
  const handleChangeToToken = (token: string) => {
    dispatch(changeToFieldToken(token));
  };
  const handleMax = (accountToken: IElrondAccountToken) => {
    const userAmount = formatBalance(accountToken, true) as number;
    dispatch(onChageFromFieldValue(userAmount.toString()));
    dispatch(onChageFromFieldValueDecimals(accountToken.balance));
  };

  return (
    <Card className="text-left">
      <CardHeader>
        <CardTitle>Swap</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <InputBox
          selectedTokenI={fromField.selectedToken}
          value={fromField.value}
          onChange={handleChangeFromField}
          onChangeToken={handleChangeFromToken}
          isLoadingInput={loadingAggregatorData}
          onMax={handleMax}
        />
        <div className="flex justify-center">
          <div className="w-10 h-10">
            <Button size={"icon"} variant={"ghost"} onClick={swapFileds}>
              <SwapIcon />
            </Button>
          </div>
        </div>

        <InputBox
          selectedTokenI={toField.selectedToken}
          value={toField.value}
          onChange={handleChangeToField}
          onChangeToken={handleChangeToToken}
          isLoadingInput={loadingAggregatorData}
        />
        <SwapInfo />
      </CardContent>
      <CardFooter>
        <SubmitButton />
      </CardFooter>
    </Card>
  );
};

export default SwapCard;
