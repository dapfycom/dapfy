"use client";
import Container from "@/components/ui-system/Container";
import ActiveGames from "./components/ActiveGames/ActiveGames";
import CreateGame from "./components/CreateGame/CreateGame";
import Heading from "./components/Heading/Heading";
import Incognito from "./components/Incognito/Incognito";
import MyGames from "./components/MyGames/MyGames";
import Stats from "./components/Stats/Stats";

const PvpView = () => {
  return (
    <Container>
      <div className="h-screen  p-8 flex flex-col items-center">
        <Heading />
        <Stats />
        <Incognito />
        <CreateGame />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <ActiveGames />
          <MyGames />
        </div>
      </div>
    </Container>
  );
};

export default PvpView;
