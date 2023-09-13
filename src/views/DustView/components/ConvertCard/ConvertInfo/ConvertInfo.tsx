import { Center, Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";
import useGetElrondToken from "hooks/useGetElrondToken";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import {
  formatBalance,
  formatBalanceDolar,
} from "utils/functions/formatBalance";
import { calculateSlipageAmount, formatTokenI } from "utils/functions/tokens";
import {
  selectConvertInfo,
  selectDustSlippage,
  selectToTokenDust,
  setSlipage,
} from "views/DustView/lib/dust-slice";
import { useGetAmountOut } from "views/DustView/lib/hooks";

const ConvertInfo = () => {
  const toTokenToConvert = useAppSelector(selectToTokenDust);
  const { elrondToken: token } = useGetElrondToken(toTokenToConvert);
  const selectedTokens = useAppSelector(selectConvertInfo);
  const { data, isLoading } = useGetAmountOut(selectedTokens);
  const slipage = useAppSelector(selectDustSlippage);

  const receiveAmount = calculateSlipageAmount(
    slipage,
    data?.amountOut || 0
  ).toString();
  return (
    <Card as={Flex} p={8} rounded="xl" w="full" flexDir={"column"} mt={8}>
      {isLoading ? (
        <Center minH={"60px"}>
          <Spinner />
        </Center>
      ) : (
        <Stack>
          <Flex
            justifyContent={"space-between"}
            mb={4}
            fontSize={{ xs: "14px", md: "md" }}
            flexDir={{ xs: "column", md: "row" }}
            textAlign={{ xs: "center", md: "initial" }}
          >
            <Text mb={5}>
              Minimum {formatTokenI(toTokenToConvert)} to receive
            </Text>
            <Flex
              flexDir={"column"}
              alignItems={{ xs: "center", md: "flex-end" }}
            >
              <Text fontWeight="600">
                {formatBalance({
                  balance: receiveAmount,
                  decimals: token?.decimals,
                })}{" "}
                {formatTokenI(toTokenToConvert)}
              </Text>
              <Text color={"GrayText"} fontWeight="600">
                ≈ $
                {formatBalanceDolar(
                  {
                    balance: receiveAmount,
                    decimals: token?.decimals,
                  },
                  token?.ticker === "USDC" ? 1 : token?.price
                )}
              </Text>
            </Flex>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            mb={4}
            fontSize={{ xs: "14px", md: "md" }}
            flexDir={{ xs: "column", md: "row" }}
            textAlign={{ xs: "center", md: "initial" }}
          >
            <Text mb={5}>Basic protocol fee:</Text>
            <Flex
              flexDir={"column"}
              alignItems={{ xs: "center", md: "flex-end" }}
            >
              <Text fontWeight="600">
                {formatTokenI(toTokenToConvert) === "BSK" ? "0%" : "3.5%"}{" "}
              </Text>
            </Flex>
          </Flex>

          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            flexDir={{ xs: "column", md: "row" }}
          >
            <Text mb={{ xs: "2", md: 0 }}> Slipage</Text>
            <Flex gap={"2"}>
              <SlipageBox percent={1} selected={slipage === 1} />
              <SlipageBox percent={2} selected={slipage === 2} />
              <SlipageBox percent={3} selected={slipage === 3} />
              <SlipageBox percent={5} selected={slipage === 5} />
            </Flex>
          </Flex>
        </Stack>
      )}
    </Card>
  );
};

export default ConvertInfo;

interface SlipageBoxProps {
  percent: number;
  selected: boolean;
}
const SlipageBox = ({ percent, selected }: SlipageBoxProps) => {
  const selectedProps = {
    bg: "primary",
    color: "white",
  };
  const dispatch = useAppDispatch();
  const handleChangeSlipage = () => {
    dispatch(setSlipage(percent));
  };
  return (
    <Center
      boxSize={"44px"}
      rounded={"md"}
      fontSize={{ xs: "sm", md: "md" }}
      {...(selected ? selectedProps : {})}
      onClick={handleChangeSlipage}
      cursor={"pointer"}
    >
      {percent}%
    </Center>
  );
};
