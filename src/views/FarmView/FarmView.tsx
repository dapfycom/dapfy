import Container from "@/components/ui-system/Container";
import FarmComponent from "./commons/FarmComponent/FarmComponent";
import FarmHeading from "./commons/FarmHeading/FarmHeading";
import FarmAshSwap from "./commons/FarmAshSwap/FarmAshSwap";
const FarmView = () => {
  return (
    <Container>
      <div className="flex flex-col items-center text-center mt-5">
        <FarmHeading />
        <div className="flex flex-col gap-3 w-full">

        <FarmComponent />
        <FarmAshSwap />
        </div>
      </div>
    </Container>
  );
};

export default FarmView;
