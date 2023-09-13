import {
  Flex,
  Image,
  Input,
  InputProps,
  Spinner,
  Text,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import LpTokenImage from "components/LpTokenImage/LpTokenImage";
import useGetAccountToken from "hooks/useGetAccountToken";
import useGetElrondToken from "hooks/useGetElrondToken";
import useGetTokenPrice from "hooks/useGetTokenPrice";
import { IElrondToken } from "types/elrond.interface";
import {
  formatBalance,
  formatBalanceDolar,
  setElrondBalance,
} from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";

interface IProps extends InputProps {
  type: "from" | "to";
  tokenI: string;
  handleChange: (value: string, token: IElrondToken) => void;
  inputValue: string;
}

const InputBox = ({ type, tokenI, inputValue, handleChange }: IProps) => {
  const { elrondToken } = useGetElrondToken(tokenI);
  const { accountToken } = useGetAccountToken(tokenI);
  const [tokenPrice] = useGetTokenPrice(tokenI);

  const handleMax = () => {
    handleChange(formatBalance(accountToken, true, 18) as any, elrondToken);
  };
  return (
    <Flex w="full" flexDir={"column"} bg="dark.100" p={4} borderRadius="md">
      <Flex gap={2} alignItems="center" mb={4}>
        {elrondToken ? (
          <>
            {formatTokenI(elrondToken.name).slice(-2) === "LP" ? (
              <LpTokenImage lpToken={elrondToken} />
            ) : (
              <Image
                src={elrondToken.assets.svgUrl}
                alt="token logo"
                boxSize={"32px"}
              />
            )}
            <Text fontSize={"xl"} color="white">
              {elrondToken.ticker}
            </Text>
          </>
        ) : (
          <Spinner />
        )}
      </Flex>
      <Flex w="full" gap={2}>
        <Flex flexDir={"column"} flex={1}>
          <Input
            variant={"unstyled"}
            placeholder={"0"}
            py={2}
            fontSize="xl"
            color="white"
            value={inputValue}
            onChange={(e) => handleChange(e.target.value, elrondToken)}
          />
          {type === "from" && elrondToken && tokenPrice && (
            <Text>
              ≈ $
              {formatBalanceDolar(
                {
                  balance: setElrondBalance(
                    Number(inputValue),
                    elrondToken.decimals
                  ),
                  decimals: elrondToken.decimals,
                },
                tokenPrice
              )}
            </Text>
          )}
        </Flex>
        {type === "from" && Boolean(accountToken) && (
          <Flex flexDir={"column"} alignItems="flex-end" gap={2}>
            <Text fontSize={"lsm"}>Balance:{formatBalance(accountToken)}</Text>
            <ActionButton
              w="fit-content"
              fontSize={"sm"}
              py={2}
              h="auto"
              onClick={handleMax}
            >
              MAX
            </ActionButton>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default InputBox;
