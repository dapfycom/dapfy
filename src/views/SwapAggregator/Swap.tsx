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
          The Ultimate Swap Aggregator
        </PageHeaderHeading>
        <PageHeaderDescription className="mb-10">
          Best Rates, Lowest Fees
        </PageHeaderDescription>

        <SwapCard />
      </div>
    </Container>
  );
};

export default Swap;
