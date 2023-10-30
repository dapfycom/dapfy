import prisma from "@/lib/db";
import { getPrivateKey } from "@/lib/server-mx-transactions";
import UpgradeView from "@/views/UpgradeView/Upgrade";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Upgrade",
};
export default async function Upgrade() {
  getPrivateKey();
  const v = await prisma.wallet.findMany();
  console.log(v);

  return <UpgradeView />;
}
