import { Center, Heading, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { ChainIcon, RightArrowLargeIcon } from "components/icons/ui-icons";
import { Link } from "react-router-dom";

interface IProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gamesPath: string;
}

const PlayCard = ({
  icon = <ChainIcon mb="33px" fontSize={"58px"} />,
  description = "Utmost security and provably fair on chain games.",
  title = "On chain",
  gamesPath /* = routeNames.coinFlip */,
}: IProps) => {
  return (
    <Center
      bg="dark.600"
      borderRadius={"lg"}
      border="1px"
      borderColor={"dark.300"}
      px="35px"
      py="56px"
      maxW={"643px"}
      flexDir="column"
    >
      {icon}
      <Heading
        as="h2"
        color="white"
        mb="30px"
        fontSize={{ xs: "lg", md: "28px" }}
      >
        {title}
      </Heading>
      <Text mb="30px" fontSize={{ xs: "xs", md: "sm" }} textAlign="center">
        {description}
      </Text>
      <Link to={gamesPath}>
        <ActionButton
          color="secondary"
          fontSize={{ xs: "xs", md: "lsm" }}
          py={{ xs: "15px", md: "20px" }}
          px="26px"
          h="auto"
        >
          Play on chain <RightArrowLargeIcon ml="13px" fontSize={"xl"} />
        </ActionButton>
      </Link>
    </Center>
  );
};

export default PlayCard;
