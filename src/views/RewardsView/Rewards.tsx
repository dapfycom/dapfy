"use client";
import Container from "@/components/ui-system/Container";
import DashboardHeading from "./common/DashboadHeading";
import { ContentTable } from "./common/HoldingsTable";
import RewardsCard from "./common/RewardsCard";
import XPaymentCard from "./common/XPaymentCard";
import { useBindXUserWithDapfyUser } from "./lib/hooks";

const Rewards = () => {
  useBindXUserWithDapfyUser();

  return (
    <Container className="mt-10 flex flex-col gap-10 max-w-[800px]">
      <DashboardHeading />
      <div className="grid  gap-8 grid-cols-1 ">
        <RewardsCard />
        {/* <Cards /> */}
        {/* <Settings /> */}
      </div>
      <div className="grid  gap-8 grid-cols-1 ">
        <ContentTable />
        <XPaymentCard />
        {/* <ShowcaseNFTs /> */}
      </div>
    </Container>
  );
};

export default Rewards;
