import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Center, Link } from "@chakra-ui/react";
import starsImage from "assets/images/banners/stars.png";
import ActionButton from "components/ActionButton/ActionButton";
const JoinTelegram = () => {
  return (
    <Center
      bg={`url(${starsImage})`}
      backgroundPosition="center"
      backgroundSize={"cover"}
      backgroundRepeat={"no-repeat"}
      borderRadius="lg"
      border={"1px"}
      borderColor="dark.300"
      w="full"
      h="full"
      px={2}
      py={"64px"}
    >
      <Link href={"https://twitter.com/xBeskar"} isExternal textStyle={""}>
        <ActionButton
          borderRadius={"full"}
          py={{ xs: "20px", lg: "30px" }}
          h="auto"
          w="full"
          maxW={"520px"}
          fontSize={{ xs: "sm", md: "lsm", lg: "lg" }}
          bg="primary"
          _hover={{
            bg: "primary",
          }}
        >
          Join Telegram group <ArrowForwardIcon ml="21px" fontSize={"25px"} />
        </ActionButton>
      </Link>
    </Center>
  );
};

export default JoinTelegram;
