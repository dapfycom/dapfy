import { Box, Flex, Text } from "@chakra-ui/react";
import TimeLineTitle from "components/TimeLineTitle/TimeLineTitle";

const PostTweet = () => {
  return (
    <Flex flexDir={"column"} gap={3}>
      <TimeLineTitle
        circleContent={
          <Box as="span" color="white" fontSize={"md"}>
            1
          </Box>
        }
        title="Post a tweet"
      />

      <Box
        borderLeft={"2px solid"}
        borderColor="blackT.400"
        minH={"100px"}
        ml={"20px"}
        px={4}
        py={2}
      >
        <Flex bg="blackT.100" p={3} borderRadius="sm">
          <Text color={"dark.200"}>
            As part of a giveaway, you ask your audience to engage with your
            tweet in order to receive your free resource. This often generates a
            lot of engagement and gives you visibility.
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PostTweet;
