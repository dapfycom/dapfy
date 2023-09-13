import { Flex } from "@chakra-ui/react";
import UserItem from "./UserItem";

const TweeterUsersList = () => {
  return (
    <Flex flexDir={"column"} gap={4}>
      <UserItem />
      <UserItem />
      <UserItem />
      <UserItem />
    </Flex>
  );
};

export default TweeterUsersList;
