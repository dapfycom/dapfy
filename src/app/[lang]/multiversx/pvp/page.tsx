import PvpView from "@/views/PvpGame/PvpView";

export function generateMetadata() {
  const title = "Player Vs Player";
  const description =
    "Discover the latest player vs player blockchain game. Join an existing game or create your own. Bet, play, and win on the MultiversX platform. Start your gaming adventure now.";
  const keywords =
    "blockchain game, player vs player, MultiversX, betting, gaming, PvP";

  return {
    title: title,
    description: description,
    keywords: keywords,
  };
}

export default function PvPPage() {
  return <PvpView />;
}
