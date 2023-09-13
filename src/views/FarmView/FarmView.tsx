import { Box } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import { MetaHead } from "components/MetaHead/MetaHead";
import FarmComponent from "./commons/FarmComponent/FarmComponent";
import FarmHeading from "./commons/FarmHeading/FarmHeading";

const FarmView = () => {
  return (
    <>
      <MetaHead metaTitle="Farm" />
      <MyContainer mb={"100px"}>
        <Box mt={"-40px"}>
          <FarmHeading />
        </Box>
        <FarmComponent />
      </MyContainer>
    </>
  );
};

export default FarmView;
