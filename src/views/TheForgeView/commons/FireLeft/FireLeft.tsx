import { Box, Image } from "@chakra-ui/react";
import fireLeftImage from "../../assets/images/fireLeft.png";
const FireLeft = () => {
  return (
    <Box position={"absolute"} left={0} bottom={"-60px"}>
      <Image src={fireLeftImage} alt="fire" />
    </Box>
  );
};

export default FireLeft;
