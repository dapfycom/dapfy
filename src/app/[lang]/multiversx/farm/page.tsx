import FarmComponent from "@/views/FarmView/commons/FarmComponent/FarmComponent";
import StakeBSK from "@/views/FarmView/commons/StakeBSK/StakeBSK";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Farm",
};
export default function Farm() {
  return (
    <div className="grid">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3   gap-8">
        <FarmComponent />
        <StakeBSK />
      </div>
    </div>
  );
}
