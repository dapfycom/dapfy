import { Alert, AlertIcon, Box, Flex, Link, Text } from "@chakra-ui/react";
import Campaings from "./commons/Campaigns/Campaings";
import Statics from "./commons/Statics/Statics";

const Follow = () => {
  return (
    <Box px={8} w="full">
      <Statics />
      <Alert
        status="warning"
        borderRadius={"md"}
        mb={12}
        fontSize="14px"
        mt={5}
      >
        <AlertIcon />
        <Flex>
          <Box as="span" fontWeight={"bold"} mr={1}>
            Status:{" "}
          </Box>
          <Text mr={1}> currently running follows from 15:00 to 21:00.</Text>
          <Link href="">Learn more</Link>
        </Flex>
      </Alert>
      <Box w="full" mb={10}>
        <Campaings />
      </Box>
    </Box>
  );
};

export default Follow;
