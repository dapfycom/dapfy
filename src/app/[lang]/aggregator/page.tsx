import Swap from "@/views/SwapAggregator/Swap";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swap Agregator",
};
export default function SwapAgregatorPage() {
  return <Swap />;
}
