import { Flex, Image, Text } from "@chakra-ui/react";
import { IElrondToken } from "types/elrond.interface";
import { formatNumber } from "utils/functions/formatBalance";

interface IProps {
  tokens: IElrondToken[];
  selectToken: (t: string) => void;
}
const TokenList = ({ tokens, selectToken }: IProps) => {
  return (
    <Flex flexDir={"column"} gap="5px">
      {tokens.map((t) => {
        return (
          <TokenRow
            key={t.identifier}
            token={t}
            onClick={() => selectToken(t.identifier)}
          />
        );
      })}
    </Flex>
  );
};

export default TokenList;
interface ITokenRowProps {
  token: IElrondToken;
  onClick: () => void;
}
const TokenRow = ({ token, onClick }: ITokenRowProps) => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems="center"
      cursor={"pointer"}
      _hover={{
        bg: "dark.100",
      }}
      px={"50px"}
      py={2}
      onClick={onClick}
    >
      <Flex gap="15px" alignItems={"center"}>
        <Image src={token.assets.svgUrl} alt="token" w={"45px"} h={"45px"} />
        <Text color="white" fontSize={"lsm"}>
          {token.ticker}
        </Text>
      </Flex>
      <Text fontSize={"lsm"}>$ {formatNumber(token.price)}</Text>
    </Flex>
  );
};
