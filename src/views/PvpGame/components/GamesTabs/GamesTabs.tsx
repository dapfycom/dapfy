import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveGames from "../ActiveGames/ActiveGames";
import GameHistory from "../GamesHistory/GameHistory";
import MyGames from "../MyGames/MyGames";
import UserGamesHistory from "../UserGamesHistory/UserGamesHistory";

const GamesTabs = () => {
  return (
    <Tabs defaultValue="account" className="w-full overflow-auto">
      <div className="w-full flex items-center flex-col">
        <div className="w-full flex items-center justify-center flex-col sm:flex-row gap-4">
          <TabsList>
            <TabsTrigger value="account">Active Games</TabsTrigger>
            <TabsTrigger value="password">Last 50 Games</TabsTrigger>
          </TabsList>
          <TabsList>
            <TabsTrigger value="history">My Games</TabsTrigger>
            <TabsTrigger value="user_history">My Last 50 Games</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="account" className="w-full">
          <ActiveGames />
        </TabsContent>
        <TabsContent value="password" className="w-full mt-[52px]">
          <div className="overflow-auto w-full">
            <GameHistory />
          </div>
        </TabsContent>

        <TabsContent value="history" className="w-full  mt-[52px]">
          <MyGames />
        </TabsContent>
        <TabsContent value="user_history" className="w-full mt-[52px]">
          {" "}
          <UserGamesHistory />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default GamesTabs;
