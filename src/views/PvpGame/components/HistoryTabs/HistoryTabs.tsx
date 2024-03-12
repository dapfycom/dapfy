import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyGames from "../MyGames/MyGames";
import UserGamesHistory from "../UserGamesHistory/UserGamesHistory";

const HistoryTabs = () => {
  return (
    <Tabs defaultValue="history" className="w-full flex items-center flex-col">
      <TabsList className="mb-11">
        <TabsTrigger value="history">My Games</TabsTrigger>
        <TabsTrigger value="user_history">My Last 50 Games</TabsTrigger>
      </TabsList>
      <TabsContent value="history" className="w-full">
        <MyGames />
      </TabsContent>
      <TabsContent value="user_history" className="w-full">
        {" "}
        <UserGamesHistory />
      </TabsContent>
    </Tabs>
  );
};

export default HistoryTabs;
