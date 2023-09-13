import { Center, Flex, useDisclosure } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import useAuthentication from "hooks/useAuthentication";
import HarvestModal from "../Modals/WithdrawModal";
import StakedDetails from "./StakedDetails/StakedDetails";

const StakedInfo = () => {
  const {
    isOpen: isOpenHarvest,
    onClose: onCloseHarvest,
    onOpen: onOpenHarvest,
  } = useDisclosure();
  const { isLoggedIn } = useAuthentication();

  const handleHarvest = (e) => {
    e.stopPropagation();
    onOpenHarvest();
  };
  return (
    <Flex
      w="full"
      px={7}
      py={5}
      bg="dark.800"
      gap={10}
      flexDir={{ xs: "column", tablet: "row" }}
    >
      {isLoggedIn ? (
        <>
          <Flex flex={1}>
            <StakedDetails />
          </Flex>
          <Flex h="full" alignItems={"center"} height="auto">
            <ActionButton
              bg="dark.100"
              w={{ xs: "full", tablet: "auto" }}
              fontSize={"lsm"}
              onClick={handleHarvest}
            >
              {" "}
              withdraw
            </ActionButton>
          </Flex>

          {isOpenHarvest && (
            <HarvestModal isOpen={isOpenHarvest} onClose={onCloseHarvest} />
          )}
        </>
      ) : (
        <Center w="full">Please connect your wallet first</Center>
      )}
    </Flex>
  );
};

export default StakedInfo;
