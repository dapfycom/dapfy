import UpgradeView from "@/views/UpgradeView/Upgrade";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Upgrade",
};
export default async function Upgrade() {
  return <UpgradeView />;
}
