import { Box, Flex, Input } from "@chakra-ui/react";
import TimeLineTitle from "components/TimeLineTitle/TimeLineTitle";
const PasteTheTweetUrl = () => {
  return (
    <Flex flexDir={"column"} gap={3}>
      <TimeLineTitle
        circleContent={
          <Box as="span" color="white" fontSize={"md"}>
            2
          </Box>
        }
        title="Paste the Tweet URL"
      />

      <Box
        borderLeft={"2px solid"}
        borderColor="blackT.400"
        minH={"100px"}
        ml={"20px"}
        px={4}
        py={2}
      >
        <Flex p={3} flexDir="column">
          <Input placeholder="Tweet url..." mb={2} />
        </Flex>
      </Box>
    </Flex>
  );
};

export default PasteTheTweetUrl;
