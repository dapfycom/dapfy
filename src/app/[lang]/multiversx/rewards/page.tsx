import Rewards from "@/views/RewardsView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Rewards",
};
export default function RewardsPage() {
  return <Rewards />;
}
