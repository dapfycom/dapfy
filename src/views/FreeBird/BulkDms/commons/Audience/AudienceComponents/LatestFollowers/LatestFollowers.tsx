import { Flex, Input } from "@chakra-ui/react";
import TweeterUsersList from "views/FreeBird/commons/TweeterUsersList/TweeterUsersList";

const LatestFollowers = () => {
  return (
    <Flex flexDir={"column"}>
      <Input borderRadius={"full"} placeholder="Filter bio..." mb={6} />
      <TweeterUsersList />
    </Flex>
  );
};

export default LatestFollowers;
