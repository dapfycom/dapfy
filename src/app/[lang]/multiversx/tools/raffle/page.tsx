import RaffleView from "@/views/RaffleView/RaffleView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Wallet Winner Selector",
  description:
    "Participate in our Multiversx-based Raffle Draw. Enter a list of wallets, choose the number of winners, and let our tool randomly select winners for you. Perfect for giveaways, contests, and community rewards on MultiversX.",
  keywords:
    "raffle draw, blockchain raffle, wallet winner selector, giveaway tool, contest tool, MultiversX raffle, cryptocurrency, blockchain contest, community reward",
};

const ToolsPage = () => {
  return <RaffleView />;
};

export default ToolsPage;
