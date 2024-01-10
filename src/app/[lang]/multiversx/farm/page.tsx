import FarmOneDex from "@/views/FarmView/commons/FarmOneDex/FarmOneDex";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Farm",
};
export default function Farm() {
  return <FarmOneDex />;
}
