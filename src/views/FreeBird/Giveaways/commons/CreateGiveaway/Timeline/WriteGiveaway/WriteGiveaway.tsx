import {
  Box,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import TimeLineTitle from "components/TimeLineTitle/TimeLineTitle";
import { useState } from "react";

const WriteGiveaway = () => {
  const [advance, setAdvance] = useState(false);
  const handleShowAdvanceOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdvance(e.target.checked);
  };
  return (
    <Flex flexDir={"column"} gap={3}>
      <TimeLineTitle
        circleContent={
          <Box as="span" color="white" fontSize={"md"}>
            3
          </Box>
        }
        title="
    Write the giveaway direct message"
      />

      <Box
        borderLeft={"2px solid"}
        borderColor="blackT.400"
        minH={"100px"}
        ml={"20px"}
        px={4}
        py={2}
      >
        <Flex p={3} flexDir="column" mb={4}>
          <Text color={"dark.200"} mb={2}>
            This message is automatically sent to the repliers of your tweet.
            Include the link of your giveaway resource.
          </Text>
          <Textarea
            placeholder="Your message..."
            size={"sm"}
            py={5}
            rows={10}
            borderRadius="md"
          ></Textarea>
        </Flex>
        <Flex p={3} flexDir="column">
          <FormControl display="flex" alignItems="center" mb={3}>
            <FormLabel
              htmlFor="advance"
              mb="0"
              flex={1}
              fontSize="sm"
              cursor={"pointer"}
            >
              Advanced customization (optional)
            </FormLabel>
            <Switch id="advance" onChange={handleShowAdvanceOptions} />
          </FormControl>
          <Collapse in={advance} animateOpacity>
            <Box>
              <FormControl display="flex" alignItems="center" mb={3}>
                <FormLabel
                  htmlFor="delay"
                  mb="0"
                  flex={1}
                  fontSize="sm"
                  cursor={"pointer"}
                  color="blackT.700"
                >
                  Message delay (hours)
                </FormLabel>
                <NumberInput maxW="150px" id="delay">
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl display="flex" alignItems="center" mb={6}>
                <FormLabel
                  htmlFor="winners"
                  mb="0"
                  flex={1}
                  fontSize="sm"
                  cursor={"pointer"}
                  color="blackT.700"
                >
                  Number of winners
                </FormLabel>
                <NumberInput maxW="150px" id="winners">
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <Text color={"blackT.700"} mb={2}>
                This message is automatically sent to the users that reply to
                your tweet after the first x reply.
              </Text>
              <Textarea
                placeholder="Your message..."
                size={"sm"}
                py={5}
                rows={10}
                borderRadius="md"
              ></Textarea>
            </Box>
          </Collapse>
        </Flex>
      </Box>
    </Flex>
  );
};

export default WriteGiveaway;
