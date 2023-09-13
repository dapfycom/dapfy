import { Flex, Select } from "@chakra-ui/react";

const Giveaway = () => {
  return (
    <Flex flexDir={"column"} gap={4}>
      <Select
        placeholder="Select a giveaway"
        maxW={"500px"}
        borderRadius="md"
      />
    </Flex>
  );
};

export default Giveaway;
