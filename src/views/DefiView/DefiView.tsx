import Container from "@/components/ui-system/Container";
import FarmHeading from "./commons/DefiHeading/DefiHeading";
import FarmsList from "./commons/FarmsList/FarmsList";
const DefiView = () => {
  return (
    <Container>
      <div className="flex flex-col items-center text-center mt-5">
        <FarmHeading />
        <FarmsList />
      </div>
    </Container>
  );
};

export default DefiView;
