import { Box, Flex } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { IElrondToken } from "types/elrond.interface";
import { setElrondBalance } from "utils/functions/formatBalance";
import {
  onChageFromFieldValue,
  onChageFromFieldValueDecimals,
  onChangeToField,
  selectFromField,
  selectToField,
} from "views/SwapView/lib/swapLp-slice";
import InputBox from "../InputBox/InputBox";
import SubmitButton from "../SubmitButton";

const SwapLpCard = () => {
  const dispatch = useAppDispatch();
  const fromField = useAppSelector(selectFromField);
  const toField = useAppSelector(selectToField);

  const handleonChangeInput = (
    type: "from" | "to",
    value,
    token?: IElrondToken
  ) => {
    if (type === "from") {
      dispatch(onChageFromFieldValue(value));

      const valueDecimals = setElrondBalance(Number(value), token.decimals);
      dispatch(onChageFromFieldValueDecimals(valueDecimals.toString()));
      dispatch(onChageFromFieldValue(value));
    } else {
      dispatch(onChangeToField(value));
    }
  };

  return (
    <Box
      borderRadius={"2xl"}
      bg="dark.500"
      maxW={"750px"}
      w="full"
      px={"30px"}
      py="35px"
      border="1px"
      borderColor={"primary"}
    >
      <Flex flexDir={"column"} gap={4} mb={10}>
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
          isReadOnly
        />
      </Flex>
      <SubmitButton />
    </Box>
  );
};

export default SwapLpCard;
