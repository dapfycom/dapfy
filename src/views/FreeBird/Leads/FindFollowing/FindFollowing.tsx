import { Flex, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import TweeterUsersList from "views/FreeBird/commons/TweeterUsersList/TweeterUsersList";

const FindFollowing = () => {
  return (
    <Flex w="full" flexDir={"column"}>
      <Flex w="full" gap={6} flexDir="column">
        <InputGroup>
          <InputLeftAddon children="@" />
          <Input type="text" placeholder="Account to fetch" />
        </InputGroup>
        <InputGroup>
          <Input type="text" placeholder="Keyword mentioned in their profile" />
        </InputGroup>
      </Flex>
      <Flex mt={10} mb={14}>
        <ActionButton>Search</ActionButton>
        <ActionButton variant={"ghost"}>Clear</ActionButton>
      </Flex>

      <TweeterUsersList />
    </Flex>
  );
};

export default FindFollowing;
