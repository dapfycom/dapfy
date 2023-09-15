import Container from "@/components/ui-system/Container";
import { SwapTabs } from "./commons/SwapTab/SwapTab";

const Swap = () => {
  return (
    <Container>
      <div className="flex flex-col items-center text-center mt-5">
        <SwapTabs />
      </div>
    </Container>
  );
};

export default Swap;
