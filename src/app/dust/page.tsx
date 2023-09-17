import DustView from "@/views/DustView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dust",
};

const DustPage = () => {
  return <DustView />;
};

export default DustPage;
