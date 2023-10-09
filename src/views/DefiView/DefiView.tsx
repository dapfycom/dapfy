import Container from "@/components/ui-system/Container";
import FarmComponent from "./commons/DefiComponent/DefiComponent";
import FarmHeading from "./commons/DefiHeading/DefiHeading";
const DefiView = () => {
  return (
    <Container>
      <div className="flex flex-col items-center text-center mt-5">
        <FarmHeading />
        <FarmComponent />
      </div>
    </Container>
  );
};

export default DefiView;
