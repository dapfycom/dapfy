import { PageHeaderHeading } from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import { SwapTabs } from "./commons/SwapTab/SwapTab";

const Swap = () => {
  return (
    <Container>
      <div className="flex flex-col items-center text-center mt-5">
        <PageHeaderHeading className="mb-10">
          Swap any tokens on MultiversX
        </PageHeaderHeading>
        <SwapTabs />
      </div>
    </Container>
  );
};

export default Swap;
