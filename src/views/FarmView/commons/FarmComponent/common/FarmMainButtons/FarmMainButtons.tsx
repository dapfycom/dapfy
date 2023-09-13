import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Center, Icon, useDisclosure } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import useAuthentication from "hooks/useAuthentication";
import { withdraw } from "views/FarmView/utils/services";
import StakeModal from "../Modals/StakeModal";

interface IProps {
  isOpen: boolean;
}

const FarmMainButtons = ({ isOpen }: IProps) => {
  const {
    isOpen: isOpenStake,
    onClose: onCloseStake,
    onOpen: onOpenStake,
  } = useDisclosure();
  const { isLoggedIn, handleConnect } = useAuthentication();
  const handleStakeLp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenStake();
  };

  const handleHarvest = (e) => {
    e.preventDefault();
    e.stopPropagation();
    withdraw();
  };

  return (
    <Center gap={4} flexDir={{ xs: "column", lg: "row" }}>
      {isLoggedIn ? (
        <>
          <ActionButton
            fontSize={"lsm"}
            onClick={handleHarvest}
            w={{ xs: "full", lg: "auto" }}
          >
            Harvest
          </ActionButton>
          <ActionButton
            bg={"dark.300"}
            fontSize={"lsm"}
            onClick={handleStakeLp}
            w={{ xs: "full", lg: "auto" }}
          >
            Stake LP
          </ActionButton>

          <ActionButton
            bg="transparent"
            px={0}
            display={{ xs: "none", xl: "block" }}
          >
            <Icon
              as={isOpen ? ChevronUpIcon : ChevronDownIcon}
              fontSize={"x-large"}
            />
          </ActionButton>
        </>
      ) : (
        <ActionButton onClick={handleConnect}>Connect Wallet</ActionButton>
      )}

      {isOpenStake && (
        <StakeModal isOpen={isOpenStake} onClose={onCloseStake} />
      )}
    </Center>
  );
};

export default FarmMainButtons;
