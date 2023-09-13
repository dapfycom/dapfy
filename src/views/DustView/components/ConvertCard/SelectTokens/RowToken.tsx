import { Box, Checkbox, Flex, Image, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { IElrondAccountToken } from "types/elrond.interface";
import {
  formatBalance,
  formatBalanceDolar,
} from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { maxAllowedTokensCount } from "views/DustView/lib/contants";
import {
  selectConvertInfo,
  selectOutputToken,
} from "views/DustView/lib/dust-slice";

interface IProps {
  token: IElrondAccountToken;
}
const RowToken = ({ token }: IProps) => {
  const dispatch = useAppDispatch();
  const selectedTokens = useAppSelector(selectConvertInfo);

  const handleSelect = (isCheked: boolean) => {
    if (selectedTokens.length <= maxAllowedTokensCount) {
      dispatch(
        selectOutputToken({
          data: token,
          isCheked: isCheked,
        })
      );
    }
  };

  const disbleTokenSelection =
    selectedTokens.length >= maxAllowedTokensCount &&
    !Boolean(selectedTokens.find((t) => t.identifier === token.identifier));
  return (
    <Box>
      <Checkbox
        value={token.identifier}
        w="full"
        sx={{
          "& .chakra-checkbox__label": {
            w: "full",
          },
        }}
        _hover={{
          opacity: "0.8",
        }}
        onChange={(e) => handleSelect(e.target.checked)}
        disabled={disbleTokenSelection}
      >
        <Flex gap={3} alignItems="center" w="full">
          {token?.assets && (
            <Box rounded={"full"} boxSize={{ xs: "30px", md: "37px" }}>
              <Image alt="" src={token.assets.svgUrl} width={37} height={37} />
            </Box>
          )}
          <Flex flexDir={"column"} gap={1} flex={1}>
            <Flex fontWeight="600" gap={2}>
              <Text>{formatBalance(token)}</Text>
              <Text>{formatTokenI(token.identifier)}</Text>
            </Flex>
            <Flex fontSize={"lsm"} color="GrayText">
              ≈ ${formatBalanceDolar(token, token.price)}
            </Flex>
          </Flex>
        </Flex>
      </Checkbox>
    </Box>
  );
};

export default RowToken;
