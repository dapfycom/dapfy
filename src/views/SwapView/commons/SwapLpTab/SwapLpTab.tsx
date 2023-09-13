import { Center } from "@chakra-ui/react";
import { MetaHead } from "components/MetaHead/MetaHead";
import SwapLpCard from "./common/SwapLpCard/SwapLpCard";

const SwapLpTab = () => {
  return (
    <>
      <MetaHead metaTitle="Swap LP" />

      <Center w="full">
        <SwapLpCard />
      </Center>
    </>
  );
};

export default SwapLpTab;
