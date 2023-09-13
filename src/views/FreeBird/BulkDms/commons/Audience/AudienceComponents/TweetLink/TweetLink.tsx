import { Box, Checkbox, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import InputField from "views/FreeBird/commons/InputField";

const TweetLink = () => {
  return (
    <Flex flexDir={"column"} gap={4}>
      <FormControl mb={3}>
        <FormLabel htmlFor="tweet" color="gray.600">
          Tweet Link
        </FormLabel>
        <InputField id="tweet" placeholder="Paste here..." />
      </FormControl>
      <Flex gap={5} mb={5}>
        <Checkbox>
          <Box>Replies</Box>
        </Checkbox>
        <Checkbox>
          {" "}
          <Box>Likes</Box>
        </Checkbox>
      </Flex>
      <ActionButton maxW="150px">Get users</ActionButton>
    </Flex>
  );
};

export default TweetLink;
