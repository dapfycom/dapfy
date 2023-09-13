import {
  Box,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { audienceList } from "../../utils/constants";

const Audience = () => {
  const [audienceId, setAudience] = useState("0");
  const handleChangeAudience = (e) => {
    setAudience(e.target.value);
  };
  return (
    <Flex flexDir={"column"} mt={4} mb={10}>
      <Heading as="h3" fontSize={"md"} mb={2} color="gray.600">
        Audience
      </Heading>
      <Text mb={3}>Define your target users</Text>
      <RadioGroup defaultValue={"0"} mb={10}>
        <Stack ml={3} spacing={3}>
          {audienceList.map((audience, i) => {
            return (
              <Radio
                key={i}
                value={audience.id}
                onChange={handleChangeAudience}
              >
                <Text> {audience.title}</Text>
              </Radio>
            );
          })}
        </Stack>
      </RadioGroup>

      <Box mt={4}>
        {audienceList?.find((a) => a.id === audienceId)?.component}
      </Box>
    </Flex>
  );
};

export default Audience;
