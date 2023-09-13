import { Flex, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";
import MyTabs2 from "components/MyTabs/MyTabs2";
import React from "react";

const AllBets = React.lazy(() => import("./AllBets/AllBets"));
const UserBets = React.lazy(() => import("./UserBets/UserBets"));
const TableSection = () => {
  return (
    <Card
      w="full"
      py="30px"
      px="0px"
      maxH={{ xs: "592px", md: "800px" }}
      overflowX={"auto"}
      position={"relative"}
    >
      <Flex
        justify={"space-between"}
        flexDir={{ xs: "column", md: "row" }}
        gap={3}
        position={{ xs: "static", md: "absolute" }}
        top={10}
        left={"30px"}
        px={{ xs: "30px", md: "0" }}
        mb={{ xs: "30px", md: "5" }}
      >
        <Text
          fontSize={"lg"}
          color="white"
          display="flex"
          alignItems={"center"}
          justifyContent={{ xs: "center", md: "normal" }}
        >
          Last 50 games
        </Text>
      </Flex>
      <MyTabs2
        tabs={[
          {
            content: <AllBets />,
            label: "All Bets",
          },
          {
            content: <UserBets />,
            label: "Your Bets",
          },
        ]}
      />
    </Card>
  );
};

export default TableSection;
