import { Center, Text } from "@chakra-ui/react";
import MyHeading from "components/MyHeading/MyHeading";

const FarmHeading = () => {
  return (
    <Center textAlign={"center"} flexDir="column">
      <MyHeading mb={6}>Farm</MyHeading>
      <Text fontSize={"lg"}>Stake tokens to earn more rewards</Text>
    </Center>
  );
};

export default FarmHeading;
