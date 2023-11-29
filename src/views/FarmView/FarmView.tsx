import Container from "@/components/ui-system/Container";
import FarmAshSwap from "./commons/FarmAshSwap/FarmAshSwap";
import FarmComponent from "./commons/FarmComponent/FarmComponent";
import FarmHeading from "./commons/FarmHeading/FarmHeading";
import FarmOneDex from "./commons/FarmOneDex/FarmOneDex";
const FarmView = () => {
  return (
    <Container className="xl:max-w-[1000px]">
      <div className="flex flex-col items-center text-center mt-5">
        <FarmHeading />
        <div className="flex flex-col gap-3 w-full">
          <FarmComponent />
          <FarmAshSwap />
          <FarmOneDex />
        </div>
      </div>
    </Container>
  );
};

export default FarmView;
