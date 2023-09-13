import { Flex, FormControl, FormLabel } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import InputField from "views/FreeBird/commons/InputField";

const TweetList = () => {
  return (
    <Flex flexDir={"column"} gap={4}>
      <FormControl>
        <FormLabel htmlFor="user" color="gray.600">
          Twitter List Link
        </FormLabel>
        <InputField id="user" placeholder="Paste here..." />
      </FormControl>

      <ActionButton maxW="150px">Get members</ActionButton>
    </Flex>
  );
};

export default TweetList;
