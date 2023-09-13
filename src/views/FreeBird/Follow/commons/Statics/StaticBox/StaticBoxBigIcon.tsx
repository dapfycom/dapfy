import { Box, Center, Flex, Icon, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IProps {
  icon: any;
  iconBgColor: string;
  value: string;
  text: ReactNode;
}

const StaticBox = ({ icon, text, value, iconBgColor }: IProps) => {
  return (
    <Box
      boxShadow={"0 0 10px rgba(0,0,0,0.4)"}
      bg=""
      w="full"
      rounded="md"
      px="7"
      py={"5"}
    >
      <Flex alignItems="center" gap={3}>
        <Center boxSize="70px" rounded={"full"} bg={iconBgColor}>
          <Icon as={icon} fontSize="3xl" color="white" />
        </Center>
        <Flex flexDir={"column"}>
          <Text fontSize={"2xl"} fontWeight="bold">
            {value}
          </Text>
          {text}
        </Flex>
      </Flex>
    </Box>
  );
};

export default StaticBox;
