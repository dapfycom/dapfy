"use client";
import Container from "@/components/ui-system/Container";
import Cards from "./common/Cards";
import DashboardHeading from "./common/DashboadHeading";
import { ContentTable } from "./common/HoldingsTable";
import RewardsCard from "./common/RewardsCard";

const Dashboard = () => {
  return (
    <Container className="mt-10 flex flex-col gap-10">
      <DashboardHeading />
      <RewardsCard />
      <Cards />
      <div className="grid  gap-8 grid-cols-1">
        <ContentTable />
        {/* <ShowcaseNFTs /> */}
      </div>
    </Container>
  );
};

export default Dashboard;
