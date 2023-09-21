import Dashboard from "@/views/DashboardView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function DashboardPage() {
  return <Dashboard />;
}
