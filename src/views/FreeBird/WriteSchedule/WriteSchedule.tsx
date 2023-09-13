import { Center, Flex } from "@chakra-ui/react";
import ScheduleButton from "./commons/ScheduleButton/ScheduleButton";
import Shedule from "./commons/ScheduleText/ScheduleText";

const WriteSchedule = () => {
  return (
    <Center
      flexDir={"column"}
      w="full"
      px={{ xs: 4, md: 10 }}
      mb={20}

      //   justifyContent="flex-start"
    >
      <Flex
        flexDir={"column"}
        maxW="700px"
        w="full"
        minH={"80vh"}
        position="relative"
        justifyContent={"center"}
      >
        <Flex w="full" right={0} top={0} pos="absolute">
          <ScheduleButton />
        </Flex>
        {/* <Heading fontSize={"xl"} fontWeight="700" color={"gray.600"}>
          Shecule your tweet
        </Heading> */}

        <Shedule />
      </Flex>
    </Center>
  );
};

export default WriteSchedule;
