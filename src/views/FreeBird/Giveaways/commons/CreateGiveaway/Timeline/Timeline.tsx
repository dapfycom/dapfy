import { CheckIcon } from "@chakra-ui/icons";
import { Flex, Icon } from "@chakra-ui/react";
import TimeLineTitle from "components/TimeLineTitle/TimeLineTitle";
import PasteTheTweetUrl from "./PasteTheTweetUrl/PasteTheTweetUrl";
import PostTweet from "./PostTweet/PostTweet";
import WriteGiveaway from "./WriteGiveaway/WriteGiveaway";

const Timeline = () => {
  return (
    <Flex flexDir={"column"} mt={5} gap={3}>
      <PostTweet />
      <PasteTheTweetUrl />
      <WriteGiveaway />
      <TimeLineTitle
        circleContent={<Icon as={CheckIcon} color="white" fontSize={"lg"} />}
        title=""
      />
    </Flex>
  );
};

export default Timeline;
