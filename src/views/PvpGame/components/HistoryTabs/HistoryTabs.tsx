import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameHistory from "../GamesHistory/GameHistory";
import UserGamesHistory from "../UserGamesHistory/UserGamesHistory";

const HistoryTabs = () => {
  return (
    <Tabs defaultValue="history" className="w-full">
      <TabsList className="mb-10">
        <TabsTrigger value="history">Last 50 Games</TabsTrigger>
        <TabsTrigger value="user_history">My Last 50 Games</TabsTrigger>
      </TabsList>
      <TabsContent value="history">
        <GameHistory />
      </TabsContent>
      <TabsContent value="user_history">
        {" "}
        <UserGamesHistory />
      </TabsContent>
    </Tabs>
  );
};

export default HistoryTabs;
