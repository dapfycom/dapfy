import Container from "@/components/ui-system/Container";
import MyTooltip from "@/components/ui-system/Tooltip/Tooltip";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import Image from "next/image";
import FarmHeading from "./commons/DefiHeading/DefiHeading";
import FarmsList from "./commons/FarmsList/FarmsList";
const DefiView = () => {
  return (
    <Container className="min-h-[60vh] xs:px-16 xl:max-w-[1000px]">
      <div className="flex flex-col items-center text-center mt-5">
        <FarmHeading />
        <div className="w-full flex justify-between mt-10 mb-4 items-end">
          <div className="flex gap-1  items-center ">
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
            <MyTooltip content="APYs % may change on a daily basis">
              <Info className="text-muted-foreground" />
            </MyTooltip>
          </div>

          <p className="text-muted-foreground text-sm hidden md:block">
            The lowest fee on Multiversx at only 7.5%
          </p>
        </div>
        <FarmsList />
      </div>
    </Container>
  );
};

export default DefiView;
