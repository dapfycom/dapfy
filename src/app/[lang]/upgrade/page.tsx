import UpgradeView from "@/views/UpgradeView/Upgrade";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Upgrade",
};
export default function Upgrade() {
  return <UpgradeView />;
}
