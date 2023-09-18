import CoinFlipView from "@/views/CoinFlipView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Play",
};
export default function Play() {
  return <CoinFlipView />;
}
