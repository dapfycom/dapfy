import Container from "@/components/ui-system/Container";
import { Label } from "@/components/ui/label";
import FarmHeading from "./commons/DefiHeading/DefiHeading";
import FarmsList from "./commons/FarmsList/FarmsList";
const DefiView = () => {
  return (
    <Container className="min-h-[60vh]">
      <div className="flex flex-col items-center text-center mt-5">
        <FarmHeading />

        <div className="flex gap-2 w-full items-center mt-10 mb-4">
          <Label className="">Protocol: </Label>
          <div className="px-4 py-1 border rounded-md">HATOM</div>
        </div>
        <FarmsList />
      </div>
    </Container>
  );
};

export default DefiView;
