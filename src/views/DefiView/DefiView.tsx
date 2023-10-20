import Container from "@/components/ui-system/Container";
import FarmHeading from "./commons/DefiHeading/DefiHeading";
import FarmsList from "./commons/FarmsList/FarmsList";
const DefiView = () => {
  return (
    <Container className="min-h-[60vh]">
      <div className="flex flex-col items-center text-center mt-5">
        <FarmHeading />
        <FarmsList />
      </div>
    </Container>
  );
};

export default DefiView;
