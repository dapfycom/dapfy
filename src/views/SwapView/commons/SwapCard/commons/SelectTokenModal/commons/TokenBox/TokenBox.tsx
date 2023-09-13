import { Center, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IProps {
  ticker: string;
  image: ReactNode;
}

const TokenBox = ({ ticker, image }: IProps) => {
  return (
    <Center
      px="15px"
      py="10px"
      gap="10px"
      border={"1px"}
      borderColor="whiteT.200"
      borderRadius={"md"}
      cursor="pointer"
    >
      {image}
      <Text fontSize={"lsm"} fontWeight={500}>
        {ticker}
      </Text>
    </Center>
  );
};

export default TokenBox;
