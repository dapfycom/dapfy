import { Center, CenterProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const ForgeCard = ({ children, ...props }: PropsWithChildren<CenterProps>) => {
  return (
    <Center
      borderRadius={"xl"}
      px={{ xs: "14px", lg: "50px" }}
      py={{ xs: "40px", lg: "50px" }}
      flexDir={"column"}
      bg="dark.600"
      textAlign={"center"}
      maxW="887px"
      w="full"
      border={"1px"}
      borderColor="dark.300"
      {...props}
    >
      {children}
    </Center>
  );
};

export default ForgeCard;
