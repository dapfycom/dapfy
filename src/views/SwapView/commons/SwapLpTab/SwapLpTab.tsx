import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { IElrondToken } from "@/types/elrond.interface";
import { setElrondBalance } from "@/utils/functions/formatBalance";
import {
  onChageFromFieldValue,
  onChageFromFieldValueDecimals,
  onChangeToField,
  selectFromField,
  selectToField,
} from "../../lib/swapLp-slice";
import InputBox from "./common/InputBox";
import SubmitButton from "./common/SubmitButton";
const SwapLpTab = () => {
  const dispatch = useAppDispatch();
  const fromField = useAppSelector(selectFromField);
  const toField = useAppSelector(selectToField);

  const handleonChangeInput = (
    type: "from" | "to",
    value: string,
    token?: IElrondToken
  ) => {
    if (token) {
      if (type === "from") {
        dispatch(onChageFromFieldValue(value));

        const valueDecimals = setElrondBalance(Number(value), token.decimals);
        dispatch(onChageFromFieldValueDecimals(valueDecimals.toString()));
        dispatch(onChageFromFieldValue(value));
      } else {
        dispatch(onChangeToField(value));
      }
    }
  };

  return (
    <Card className="text-left">
      <CardHeader>
        <CardTitle>Sawp LP</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <InputBox
          type="from"
          tokenI={fromField.selectedToken}
          inputValue={fromField.value}
          handleChange={(value, token) =>
            handleonChangeInput("from", value, token)
          }
        />

        <InputBox
          type="to"
          tokenI={toField.selectedToken}
          inputValue={toField.value}
          handleChange={(value) => handleonChangeInput("to", value)}
        />
      </CardContent>
      <CardFooter>
        <SubmitButton />
      </CardFooter>
    </Card>
  );
};

export default SwapLpTab;
