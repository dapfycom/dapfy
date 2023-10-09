import DefiView from "@/views/DefiView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Farm",
};
export default function Defi() {
  return <DefiView />;
}
