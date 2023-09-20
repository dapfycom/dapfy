import Container from "@/components/ui-system/Container";
import Cards from "./common/Cards";
import DashboadHeading from "./common/DashboadHeading";
import { ContentTable } from "./common/HoldingsTable";
import ShowcaseNFTs from "./common/ShowcaseNFTs";

const Dashboard = async () => {
  return (
    <Container className="mt-10 flex flex-col gap-10">
      <DashboadHeading />
      <Cards />
      <div className="grid lg:grid-cols-2 gap-8 grid-cols-1">
        <ContentTable />
        <ShowcaseNFTs />
      </div>
    </Container>
  );
};

export default Dashboard;
