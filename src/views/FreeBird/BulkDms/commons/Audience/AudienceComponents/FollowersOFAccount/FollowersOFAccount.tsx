import { Flex, FormControl, FormLabel } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import InputField from "views/FreeBird/commons/InputField";

const FollowersOFAccount = () => {
  return (
    <Flex flexDir={"column"} gap={4}>
      <FormControl>
        <FormLabel htmlFor="user" color="gray.600">
          Twitter Account
        </FormLabel>
        <InputField id="user" placeholder="@beskar" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="user" color="gray.600">
          Next cursor
        </FormLabel>
        <InputField id="user" placeholder="xxxxxxxxxxxxxx" />
      </FormControl>
      <ActionButton maxW="150px">Get users</ActionButton>
    </Flex>
  );
};

export default FollowersOFAccount;
