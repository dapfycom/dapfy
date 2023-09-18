import { VStack } from "@chakra-ui/react";
import Coin from "./common/Coin";
const GameSection = () => {
  return (
    <VStack gap={7} w="full">
      <Coin />
    </VStack>
  );
};

export default GameSection;
