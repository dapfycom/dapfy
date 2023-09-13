import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { BookIcon } from "components/icons/ui-icons";
import Timeline from "./Timeline/Timeline";

const CreateGiveaway = () => {
  return (
    <Flex flexDir={"column"} maxW="700px">
      <Heading fontSize={"xl"} fontWeight="700" color={"gray.600"}>
        Create Giveaway
      </Heading>

      <Timeline />
      <Link
        href="https://www.hivoe.com/blog/understand-giveaway-automation"
        isExternal
      >
        <Flex
          shadow={"md"}
          mt={20}
          color="blackT.500"
          gap={3}
          borderRadius="md"
          border={"1px solid"}
          borderColor="blackT.200"
          py={5}
          px={4}
          alignItems="center"
          flexWrap={"wrap"}
        >
          <Icon as={BookIcon} fontSize="lg" />
          <Text flex={1} fontSize={{ xs: "xs", md: "sm" }}>
            Learn how to use the Giveaway Automation
          </Text>
          <Icon as={ExternalLinkIcon} fontSize="lg" />
        </Flex>
      </Link>
    </Flex>
  );
};

export default CreateGiveaway;
