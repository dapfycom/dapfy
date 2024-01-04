import Container from "@/components/ui-system/Container";
import MyTooltip from "@/components/ui-system/Tooltip/Tooltip";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import Image from "next/image";
import FarmsList from "../DefiView/commons/FarmsList/FarmsList";
import FarmComponent from "./commons/FarmComponent/FarmComponent";
import FarmHeading from "./commons/FarmHeading/FarmHeading";
import FarmOneDex from "./commons/FarmOneDex/FarmOneDex";

const FarmView = () => {
  return (
    <Container className="xl:max-w-[1200px]">
      <div className="flex flex-col items-center text-center mt-5">
        <FarmHeading />
        <div className="flex flex-col gap-3 w-full">
          <FarmComponent />
          {/* <FarmAshSwap /> */}
          <FarmOneDex />

          {/* Hatom farms */}
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
      </div>
    </Container>
  );
};

export default FarmView;
