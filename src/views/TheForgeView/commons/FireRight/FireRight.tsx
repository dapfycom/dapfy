import { Box, Image } from "@chakra-ui/react";
import fireRightImage from "../../assets/images/fireRight.png";
const FireRight = () => {
  return (
    <Box position={"absolute"} right={0} bottom={"-120px"}>
      <Image src={fireRightImage} alt="fire" />
    </Box>
  );
};

export default FireRight;
