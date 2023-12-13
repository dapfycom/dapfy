import Container from "@/components/ui-system/Container";
import FarmComponent from "./commons/FarmComponent/FarmComponent";
import FarmHeading from "./commons/FarmHeading/FarmHeading";
const FarmView = () => {
  return (
    <Container className="xl:max-w-[1200px]">
      <div className="flex flex-col items-center text-center mt-5">
        <FarmHeading />
        <div className="flex flex-col gap-3 w-full">
          <FarmComponent />
          {/* <FarmAshSwap />
          <FarmOneDex /> */}
        </div>
      </div>
    </Container>
  );
};

export default FarmView;
