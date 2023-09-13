import {
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Switch,
  Text,
} from "@chakra-ui/react";
import { FireIcon, SwapIcon, TwitterIcon } from "components/icons/ui-icons";
import TimeLineTitle from "components/TimeLineTitle/TimeLineTitle";
import { Fragment } from "react";

const smartRetweet = [
  {
    title: "New Tweet",
    circleBgColor: "rgb(29, 155, 240)",
    circleContent: TwitterIcon,
  },
  {
    title: "Auto-retweet 1h later",
    circleBgColor: "rgb(167, 46, 204)",
    circleContent: SwapIcon,
  },
  {
    title: "Auto-retweet 6h later",
    circleBgColor: "rgb(167, 46, 204)",
    circleContent: SwapIcon,
  },
  {
    title: "Auto-retweet 12h later",
    circleBgColor: "rgb(167, 46, 204)",
    circleContent: SwapIcon,
  },
  {
    title: "Auto-retweet 18h later",
    circleBgColor: "rgb(167, 46, 204)",
    circleContent: SwapIcon,
  },
  {
    title: "Un-retweet 24h later",
    circleBgColor: "rgb(46, 204, 64)",
    circleContent: FireIcon,
  },
];

const SmartRetweets = () => {
  return (
    <Center flexDir={"column"} w="full" px={{ xs: 4, md: 10 }}>
      <Flex maxW="700px" flexDir={"column"} h="full" w="full">
        <FormControl w="full">
          <FormLabel
            htmlFor="disabled"
            mb="0"
            flex={1}
            cursor={"pointer"}
            w="full"
            display={"flex"}
          >
            <Heading
              fontSize={"xl"}
              fontWeight="semibold"
              mb={2}
              flex={1}
              color="gray.700"
            >
              Status
            </Heading>
            <Switch id="disabled" />
          </FormLabel>
        </FormControl>
        <Text mb={6} color="gray.500">
          Auto-retweets are disabled!
        </Text>
        <Flex flexDir={"column"} w="full" mt={6} pl={6}>
          {smartRetweet.map((item, index) => (
            <Fragment key={index}>
              <TimeLineTitle
                circleContent={
                  <Icon as={item.circleContent} color="white" fontSize={"lg"} />
                }
                title={item.title}
                circleBgColor={item.circleBgColor}
              />
              {index !== smartRetweet.length - 1 && (
                <Divider
                  orientation="vertical"
                  h="50px"
                  ml={"20px"}
                  borderColor="gray.300"
                  borderLeftWidth={"2px"}
                />
              )}
            </Fragment>
          ))}
        </Flex>
      </Flex>
    </Center>
  );
};

export default SmartRetweets;
