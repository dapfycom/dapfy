"use client";
import Container from "@/components/ui-system/Container";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import FarmComponent from "./commons/FarmComponent/FarmComponent";
import FarmHeading from "./commons/FarmHeading/FarmHeading";

const FarmOneDex = dynamic(() => import("./commons/FarmOneDex/FarmOneDex"));
const FarmsList = dynamic(
  () => import("../DefiView/commons/FarmsList/FarmsList")
);
const FarmView = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<number>(0);
  return (
    <Container className="xl:max-w-[1200px]">
      <div className="flex flex-col items-center text-center mt-5">
        <FarmHeading />
        <div className="flex flex-col gap-3 w-full">
          <FarmComponent />

          <div className="text-4xl font-bold mt-8 mb-4">
            Auto-Compounded DeFi Farming
          </div>

          <div className="flex gap-3 items-center">
            <div>Protocols : </div>
            <ProtolContainer
              onClick={() => setSelectedProtocol((p) => (p === 0 ? -1 : 0))}
              selected={selectedProtocol === 0}
            >
              <Image
                src={
                  "data:image/png;base64,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"
                }
                alt="hatom"
                width={80}
                height={26}
              />
            </ProtolContainer>

            {/* Hatom protocol */}
            <ProtolContainer
              onClick={() => setSelectedProtocol((p) => (p === 1 ? -1 : 1))}
              selected={selectedProtocol === 1}
            >
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
            </ProtolContainer>
          </div>

          {selectedProtocol === 0 && <FarmOneDex />}
          {selectedProtocol === 1 && <FarmsList />}
        </div>
      </div>
    </Container>
  );
};

export default FarmView;

const ProtolContainer = ({
  children,
  onClick,
  selected,
}: PropsWithChildren<{ onClick: () => void; selected: boolean }>) => {
  return (
    <Button
      asChild
      variant={selected ? "secondary" : "outline"}
      className="cursor-pointer"
      onClick={onClick}
    >
      <div className="px-2 py-1  rounded-md ">{children}</div>
    </Button>
  );
};
