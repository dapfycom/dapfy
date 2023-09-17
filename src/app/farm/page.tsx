import FarmView from "@/views/FarmView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Farm",
};
export default function Farm() {
  return <FarmView />;
}
