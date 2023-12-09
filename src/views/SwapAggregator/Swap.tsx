import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import Image from "next/image";
import SwapCard from "./commons/SwapCard";

const Swap = () => {
  return (
    <Container>
      <div className="flex flex-col items-center text-center mt-5">
        <PageHeaderHeading className="mb-6">
          <span className={"gradienteTitle"}>The Ultimate Swap Aggregator</span>
        </PageHeaderHeading>
        <PageHeaderDescription className="mb-10">
          <span className="flex gap-2 items-end ">
            Powered by{" "}
            <Image
              src={"/images/AshSwap-logo.png"}
              alt="AshSwap"
              width={2000}
              height={1074}
              className="w-[70px]"
            />
          </span>
        </PageHeaderDescription>

        <SwapCard />
      </div>
    </Container>
  );
};

export default Swap;
