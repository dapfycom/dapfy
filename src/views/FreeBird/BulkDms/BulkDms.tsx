import { Flex, Heading, Text } from "@chakra-ui/react";
import Audience from "./commons/Audience/Audience";
import Title from "./commons/Title/Title";

const BulkDms = () => {
  return (
    <Flex flexDir={"column"} w="full" px={{ xs: 4, md: 10 }}>
      <Heading fontSize={"xl"} fontWeight="semibold" mb={2} color="gray.700">
        Create campaign
      </Heading>
      <Text mb={8} color="gray.500">
        Send multiple customized direct messages at once
      </Text>
      <Title />
      <Audience />
    </Flex>
  );
};

export default BulkDms;
