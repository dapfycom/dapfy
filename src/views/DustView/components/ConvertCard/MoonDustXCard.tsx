import { Flex, Image, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";

import useGetMultipleElrondTokens from "hooks/useGetMultipleElrondTokens";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { formatTokenI } from "utils/functions/tokens";
import {
  selectToToken,
  selectToTokenDust,
} from "views/DustView/lib/dust-slice";
import { useGetAllowedOutputTokens } from "views/DustView/lib/hooks";
import ConvertButton from "./ConvertButton/ConvertButton";
import ConvertInfo from "./ConvertInfo/ConvertInfo";
import SelectAllTokens from "./SelectAllTokens/SelectAllTokens";
import SelectTokens from "./SelectTokens/SelectTokens";

const MoonDustXCard = () => {
  const dispatch = useAppDispatch();
  const selectedToToken = useAppSelector(selectToTokenDust);
  const { outputTokens: toTokensToConvert } = useGetAllowedOutputTokens();
  const { tokens } = useGetMultipleElrondTokens(toTokensToConvert);
  return (
    <Flex
      flexDir={"column"}
      bg="dark.500"
      py={10}
      px={{ xs: 3, md: 7 }}
      borderRadius={{ xs: "xl", md: "4xl" }}
    >
      <Flex
        justify={"space-between"}
        align={"center"}
        mb={4}
        flexDir={{ xs: "column", md: "row" }}
      >
        <Text flex={1} mr={2} color={"white"} mb={{ xs: "4", md: "0" }}>
          Convert into
        </Text>
        <Flex
          justifyContent={{ xs: "center", md: "flex-end" }}
          gap={4}
          flexWrap={"wrap"}
        >
          {toTokensToConvert.map((tokenI) => {
            const elrondToken = tokens?.find((t) => t.identifier === tokenI);
            return (
              <ActionButton
                key={tokenI}
                // variant={selectedToToken === tokenI ? "solid" : "outline"}
                border={selectedToToken !== tokenI && "1px solid"}
                borderColor={"primary"}
                bgColor={selectedToToken === tokenI ? "white" : "transparent"}
                color={"primary"}
                _hover={{
                  color: "primary",
                }}
                onClick={() => dispatch(selectToToken(tokenI))}
                fontSize={"14px"}
              >
                <Flex alignItems={"center"} gap={3}>
                  {elrondToken?.assets?.svgUrl && (
                    <Image
                      src={elrondToken.assets.svgUrl}
                      alt=""
                      width={26}
                      height={26}
                    />
                  )}
                  {formatTokenI(tokenI)}
                </Flex>
              </ActionButton>
            );
          })}
        </Flex>
      </Flex>
      <SelectTokens />
      <Flex w="full" mt={4}>
        <SelectAllTokens />
      </Flex>
      <Text mt={8} color="gray.300" fontSize={{ xs: "lsm", md: "md" }}>
        0% fees when converting into BSK 🥳️
      </Text>
      <ConvertInfo />
      <ConvertButton />
    </Flex>
  );
};

export default MoonDustXCard;
