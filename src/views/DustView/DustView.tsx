import { Box, Center, Tooltip } from "@chakra-ui/react";
import { MetaHead } from "components/MetaHead/MetaHead";
import MyHeading from "components/MyHeading/MyHeading";
import MoonDustXCard from "./components/ConvertCard/MoonDustXCard";

const DustView = () => {
  return (
    <>
      <MetaHead metaTitle="Dust" />
      <Center flexDir={"column"}>
        <Tooltip label="Our Dust Converter offers the smallest fees you'll find anywhere, outdoing all competitors. 💸🔥">
          <Box mb={10}>
            <MyHeading> The Dust Converter</MyHeading>
          </Box>
        </Tooltip>
        <Box maxW={"750px"} w="80%">
          <MoonDustXCard />
        </Box>
      </Center>
    </>
  );
};

export default DustView;
