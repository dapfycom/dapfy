import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveGames from "../ActiveGames/ActiveGames";
import MyGames from "../MyGames/MyGames";

const GamesTabs = () => {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Active Games</TabsTrigger>
        <TabsTrigger value="password">My Games</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <ActiveGames />
      </TabsContent>
      <TabsContent value="password">
        {" "}
        <MyGames />
      </TabsContent>
    </Tabs>
  );
};

export default GamesTabs;
