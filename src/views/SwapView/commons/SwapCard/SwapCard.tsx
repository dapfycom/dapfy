import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { IElrondAccountToken } from "@/types/elrond.interface";
import {
  formatBalance,
  setElrondBalance,
} from "@/utils/functions/formatBalance";
import { useGetSwapRate } from "@/views/SwapView/lib/hooks";
import {
  changeFromFieldToken,
  changeToFieldToken,
  onChageFromFieldValue,
  onChageFromFieldValueDecimals,
  onChangeToField,
  selectFromField,
  selectToField,
} from "@/views/SwapView/lib/swap-slice";
import InputBox from "./commons/InputBox";
import SubmitButton from "./commons/SubmitButton";

const SwapCard = () => {
  const fromField = useAppSelector(selectFromField);
  const toField = useAppSelector(selectToField);
  const { isLoading: loadingRoutes } = useGetSwapRate();
  const dispatch = useAppDispatch();
  const handleChangeFromField = (
    e: React.ChangeEvent<HTMLInputElement>,
    token?: IElrondAccountToken
  ) => {
    if (token) {
      dispatch(onChageFromFieldValue(e.target.value));

      const valueDecimals = setElrondBalance(
        Number(e.target.value),
        token.decimals
      );
      dispatch(onChageFromFieldValueDecimals(valueDecimals.toString()));
    }
  };
  const handleChangeToField = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(onChangeToField(e.target.value));
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
      <CardContent className="space-y-2">
        <InputBox
          selectedTokenI={fromField.selectedToken}
          value={fromField.value}
          onChange={handleChangeFromField}
          onChangeToken={handleChangeFromToken}
          isLoadingInput={loadingRoutes}
          onMax={handleMax}
        />

        <InputBox
          selectedTokenI={toField.selectedToken}
          value={toField.value}
          onChange={handleChangeToField}
          onChangeToken={handleChangeToToken}
          isLoadingInput={loadingRoutes}
          disabeledTokenSelection
        />
      </CardContent>
      <CardFooter>
        <SubmitButton />
      </CardFooter>
    </Card>
  );
};

export default SwapCard;
