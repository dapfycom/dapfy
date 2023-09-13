import { Box, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IProps {
  icon: ReactNode;
  value: string;
  text: string;
}

const StaticBoxSmallIcon = ({ icon, text, value }: IProps) => {
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
        {icon}
        <Flex>
          <Text fontSize={"2xl"} fontWeight="bold">
            {value}
          </Text>
        </Flex>
      </Flex>
      <Text fontSize={"sm"}>{text}</Text>
    </Box>
  );
};

export default StaticBoxSmallIcon;
