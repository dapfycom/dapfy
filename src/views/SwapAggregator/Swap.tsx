import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import SwapCard from "./commons/SwapCard";

const Swap = () => {
  return (
    <Container>
      <div className="flex flex-col items-center text-center mt-5">
        <PageHeaderHeading className="mb-6">
          Ultimate Crypto Swap Aggregator
        </PageHeaderHeading>
        <PageHeaderDescription className="mb-10">
          Discover the Best Swap Rates on Multiversx Across Multiple
          Decentralized Exchanges Seamlessly
        </PageHeaderDescription>

        <SwapCard />
      </div>
    </Container>
  );
};

export default Swap;
