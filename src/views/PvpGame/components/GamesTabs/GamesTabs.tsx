import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveGames from "../ActiveGames/ActiveGames";
import GameHistory from "../GamesHistory/GameHistory";

const GamesTabs = () => {
  return (
    <Tabs defaultValue="account" className="w-full">
      <div className="w-full flex items-center flex-col">
        <TabsList>
          <TabsTrigger value="account">Active Games</TabsTrigger>
          <TabsTrigger value="password">Last 50 Games</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="w-full">
          <ActiveGames />
        </TabsContent>
        <TabsContent value="password" className="w-full mt-[52px]">
          <GameHistory />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default GamesTabs;
