import { Avatar, Box, Flex, Text, Textarea } from "@chakra-ui/react";

const Shedule = () => {
  return (
    <Flex p={3} flexDir="column">
      <Flex gap={3} w="full">
        <Box mt={3}>
          <Avatar />
        </Box>
        <Flex flexDir="column" gap={2}>
          <Flex gap={2}>
            <Text fontWeight={"semibold"} color="gray.800">
              ⚡Cesar⚡
            </Text>
            <Text color="gray.500">@Cesar9943</Text>
          </Flex>
          <Textarea
            placeholder="Empty tweet..."
            size={"sm"}
            py={5}
            rows={10}
            borderRadius="md"
            autoFocus
            cols={150}
          ></Textarea>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Shedule;
