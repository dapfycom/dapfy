import { Box, Center, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import React, { Suspense, useState } from "react";

const FindFollowers = React.lazy(() => import("./FindFollowers/FindFollowers"));
const FindFollowing = React.lazy(() => import("./FindFollowing/FindFollowing"));

type viewType = "followers" | "following";

const Leads = () => {
  const [view, setView] = useState<viewType>("followers");
  const handleChangeView = (v: viewType) => {
    setView(v);
  };

  let componentView = <FindFollowers />;
  switch (view) {
    case "followers":
      componentView = <FindFollowers />;
      break;
    case "following":
      componentView = <FindFollowing />;

      break;

    default:
      break;
  }
  return (
    <Center flexDir={"column"} w="full" px={{ xs: 4, md: 10 }}>
      <Flex maxW="700px" flexDir={"column"}>
        <Heading fontSize={"xl"} fontWeight="semibold" mb={2} color="gray.700">
          Find customers
        </Heading>
        <Text mb={8} color="gray.500">
          Filter through the follower list or the following list of a profile
        </Text>

        <Flex gap={2} mb={10} flexDir={{ xs: "column", lg: "row" }} w="full">
          <ActionButton
            borderRadius="full"
            variant={view === "followers" ? "solid" : "ghost"}
            onClick={() => handleChangeView("followers")}
            color={view === "followers" ? "gray.700" : "gray.400"}
            fontWeight={"bold"}
            w="full"
            maxW={"250px"}
          >
            {/* <SendMessageIcon fontSize={"22px"} mr={1} /> */}
            Follower list
          </ActionButton>
          <ActionButton
            borderRadius="full"
            variant={view === "following" ? "solid" : "ghost"}
            color={view === "following" ? "gray.700" : "gray.400"}
            fontWeight={"bold"}
            onClick={() => handleChangeView("following")}
            w="full"
            maxW={"250px"}
          >
            {/* <AMessageIcon fontSize={"xl"} mr={1} /> */}
            Following list
          </ActionButton>
        </Flex>
        <Box>
          <Suspense fallback={<Spinner />}>{componentView}</Suspense>
        </Box>
      </Flex>
    </Center>
  );
};

export default Leads;
