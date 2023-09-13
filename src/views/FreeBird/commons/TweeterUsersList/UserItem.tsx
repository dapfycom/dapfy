import { PlusSquareIcon } from "@chakra-ui/icons";
import { Avatar, Center, Flex, Icon, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";

const UserItem = () => {
  return (
    <Flex flexDir={"column"} pr={"60px"} position="relative" cursor={"pointer"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          size={"xs"}
        />
        <Text
          fontSize={"12px"}
          color="gray.700"
          fontWeight={"600"}
          maxW="100px"
        >
          Tomas
        </Text>
        <Text color="primary" fontSize={"12px"} fontWeight={"600"}>
          @Im_tomas_92
        </Text>
      </Flex>

      <Flex mt={1}>
        <Text fontSize={"14px"} color="gray.600">
          Passionate about innovation and making a difference in people's lives.
          Exploring new technologies and ideas to bring positive change. Always
          up for a good chall
        </Text>
      </Flex>

      <Center
        position="absolute"
        right={0}
        top={0}
        bottom={0}
        h="full"
        w={"40px"}
      >
        <ActionButton variant={"ghost"}>
          <Icon as={PlusSquareIcon} />
        </ActionButton>
      </Center>
    </Flex>
  );
};

export default UserItem;
