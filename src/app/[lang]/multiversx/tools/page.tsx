import ToolsView from "@/views/ToolsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools",
};

const ToolsPage = () => {
  return <ToolsView />;
};

export default ToolsPage;
