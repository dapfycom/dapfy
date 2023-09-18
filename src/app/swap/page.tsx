import Swap from "@/views/SwapView/Swap";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swap",
};
export default function SwapPage() {
  return <Swap />;
}
