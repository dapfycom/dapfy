import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
const InboundView = () => {
  return (
    <Box w="full">
      <Text mb={8}>
        The users will receive this Direct Message when they open your chat.
      </Text>
      <FormControl display="flex" alignItems="center" mb={3}>
        <FormLabel
          htmlFor="disabled"
          mb="0"
          flex={1}
          color="gray.800"
          fontWeight={"500"}
          cursor={"pointer"}
        >
          Disabled
        </FormLabel>
        <Switch id="disabled" />
      </FormControl>

      <Textarea
        placeholder="Hello, welcome to my Twitter inbox. I'll try to make my best to get back to you soon. In the meantime you might even find your answer at one of these link!"
        rows={8}
      />
      <Flex justify="flex-end" mt={5} mb={8}>
        <ActionButton bg="dark.500" fontSize={"14px"}>
          Save message
        </ActionButton>
      </Flex>
    </Box>
  );
};

export default InboundView;
