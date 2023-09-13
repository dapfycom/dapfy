import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import { MetaHead } from "components/MetaHead/MetaHead";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { IElrondAccountToken } from "types/elrond.interface";
import { formatBalance, setElrondBalance } from "utils/functions/formatBalance";
import { useGetSwapRate } from "views/SwapView/lib/hooks";
import {
  changeFromFieldToken,
  changeToFieldToken,
  onChageFromFieldValue,
  onChageFromFieldValueDecimals,
  onChangeToField,
  selectFromField,
  selectToField,
} from "views/SwapView/lib/swap-slice";
import InputBox from "./commons/InputBox";
import Settings from "./commons/Settings";
import SubmitButton from "./commons/SubmitButton";
const SwapCard = () => {
  const fromField = useAppSelector(selectFromField);
  const toField = useAppSelector(selectToField);
  const { isLoading: loadingRoutes } = useGetSwapRate();
  const dispatch = useAppDispatch();
  const handleChangeFromField = (
    e: React.ChangeEvent<HTMLInputElement>,
    token: IElrondAccountToken
  ) => {
    dispatch(onChageFromFieldValue(e.target.value));

    const valueDecimals = setElrondBalance(
      Number(e.target.value),
      token.decimals
    );
    dispatch(onChageFromFieldValueDecimals(valueDecimals.toString()));
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
    const userAmount = formatBalance(accountToken, true);
    dispatch(onChageFromFieldValue(userAmount.toString()));
    dispatch(onChageFromFieldValueDecimals(accountToken.balance));
  };

  return (
    <>
      <MetaHead metaTitle="Swap" />

      <Center w="full">
        <Box
          borderRadius={"2xl"}
          bg="dark.500"
          maxW={"750px"}
          w="full"
          p={"30px"}
          pt={"20px"}
          border="1px"
          borderColor={"primary"}
        >
          <Flex
            w="full"
            justifyContent="space-between"
            alignItems={"center"}
            mb={{ xs: "10px", lg: "20px" }}
          >
            <Heading
              as="h2"
              fontSize={{ xs: "2xl", lg: "3xl" }}
              fontWeight={700}
              color="white"
            >
              Swap
            </Heading>
            <Settings />
          </Flex>
          <Flex
            position={"relative"}
            flexDir="column"
            gap={{ xs: "5px", lg: "10px" }}
            mb="30px"
          >
            {/* <Box
            position={"absolute"}
            top={{ xs: "44%", lg: "43%" }}
            left={{ xs: "44%", lg: "45%" }}
            borderRadius={"full"}
            bg="dark.500"
            p={{ xs: "3px", lg: "7px" }}
            cursor={"pointer"}
          >
            <Center
              borderRadius={"full"}
              bg="dark.400"
              boxSize={{ xs: "25px", lg: "45px" }}
            >
              <ArrowDownIcon fontSize={{ xs: "11px", lg: "22px" }} />
            </Center>
          </Box> */}
            <InputBox
              selectedTokenI={fromField.selectedToken}
              value={fromField.value}
              onChange={handleChangeFromField}
              onChangeToken={handleChangeFromToken}
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
          </Flex>
          <SubmitButton />
        </Box>
      </Center>
    </>
  );
};

export default SwapCard;
