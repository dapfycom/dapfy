import Container from "@/components/ui-system/Container";
import MyTooltip from "@/components/ui-system/Tooltip/Tooltip";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import FarmHeading from "./commons/DefiHeading/DefiHeading";
import FarmsList from "./commons/FarmsList/FarmsList";
import Image from "next/image";
const DefiView = () => {
  return (
    <Container className="min-h-[60vh]">
      <div className="flex flex-col items-center text-center mt-5">
        <FarmHeading />

        <div className="flex gap-1 w-full items-center mt-10 mb-4">
          <Label className="">Protocol: </Label>
          <div className="px-2 py-1  rounded-md mr-3">
            <Image
              src={"/images/hatom-text-white.png"}
              alt="hatom"
              width={80}
              height={26}
              className="hidden dark:block"
            />
            <Image
              src={"/images/hatom-text-black.png"}
              alt="hatom"
              width={80}
              height={26}
              className="block dark:hidden"
            />
          </div>
          <MyTooltip content="Apy will be show soon, we are optimizing for the best APY">
            <Info className="text-muted-foreground" />
          </MyTooltip>
        </div>
        <FarmsList />
      </div>
    </Container>
  );
};

export default DefiView;
