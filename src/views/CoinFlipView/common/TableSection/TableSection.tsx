import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllBets from "./AllBets/AllBets";
import UserBets from "./UserBets/UserBets";

// const AllBets = React.lazy(() => import("./AllBets/AllBets"));
// const UserBets = React.lazy(() => import("./UserBets/UserBets"));
const TableSection = () => {
  return (
    <div className="flex border flex-col px-5 py-4 pt-8 rounded-md h-full max-h-[592px] md:max-h-[800px] overflow-auto">
      <Tabs defaultValue="allBets" className="w-full">
        <div className="flex justify-between">
          <h4>Last 50 games</h4>
          <TabsList>
            <TabsTrigger value="allBets">All Bets</TabsTrigger>
            <TabsTrigger value="userBets">Your Bets</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="allBets">
          <AllBets />
        </TabsContent>
        <TabsContent value="userBets">
          <UserBets />
        </TabsContent>
      </Tabs>
    </div>

    // <Card
    //   w="full"
    //   py="30px"
    //   px="0px"
    //   maxH={{ xs: "592px", md: "800px" }}
    //   overflowX={"auto"}
    //   position={"relative"}
    // >
    //   <Flex
    //     justify={"space-between"}
    //     flexDir={{ xs: "column", md: "row" }}
    //     gap={3}
    //     position={{ xs: "static", md: "absolute" }}
    //     top={10}
    //     left={"30px"}
    //     px={{ xs: "30px", md: "0" }}
    //     mb={{ xs: "30px", md: "5" }}
    //   >
    //     <Text
    //       fontSize={"lg"}
    //       color="white"
    //       display="flex"
    //       alignItems={"center"}
    //       justifyContent={{ xs: "center", md: "normal" }}
    //     >
    //       Last 50 games
    //     </Text>
    //   </Flex>
    //   <MyTabs2
    //     tabs={[
    //       {
    //         content: <AllBets />,
    //         label: "All Bets",
    //       },
    //       {
    //         content: <UserBets />,
    //         label: "Your Bets",
    //       },
    //     ]}
    //   />
    // </Card>
  );
};

export default TableSection;
