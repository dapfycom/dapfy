import Container from "@/components/ui-system/Container";
import FarmComponent from "./commons/FarmComponent/FarmComponent";
import FarmHeading from "./commons/FarmHeading/FarmHeading";
const FarmView = () => {
  return (
    <Container>
      <div className="flex flex-col items-center text-center mt-5">
        <FarmHeading />
        <FarmComponent />
      </div>
    </Container>
  );
};

export default FarmView;
