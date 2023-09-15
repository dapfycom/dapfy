/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Center,
  Collapse,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { LpTokenImageV2 } from "components/LpTokenImage/LpTokenImage";
import { selectedNetwork } from "config/network";
import { routeNames } from "config/routes";
import useGetElrondToken from "hooks/useGetElrondToken";
import useGetTokenPrice from "hooks/useGetTokenPrice";
import { Link } from "react-router-dom";
import { formatBalanceDolar } from "utils/functions/formatBalance";
import { useGetFarmsInfo } from "views/FarmView/utils/hooks";
import FarmInfo from "./common/FarmInfo/FarmInfo";
import FarmMainButtons from "./common/FarmMainButtons/FarmMainButtons";
import StakedInfo from "./common/StakedInfo/StakedInfo";
const FarmComponent = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { elrondToken } = useGetElrondToken(selectedNetwork.tokensID.bskwegld);
  const { data: farmInfo } = useGetFarmsInfo();
  const [price] = useGetTokenPrice(selectedNetwork.tokensID.bskwegld);

  return (
    <Center mb={20} mt={12} flexDir="column">
      <Box maxW="1300px" w="full" borderRadius="md" overflow={"hidden"}>
        <Flex
          gap={10}
          w="full"
          bg="dark.500"
          px={7}
          py={5}
          onClick={onToggle}
          cursor="pointer"
          flexWrap={"wrap"}
          flexDir={{ xs: "column", lg: "row" }}
          alignItems="center"
        >
          <Flex gap={3} flex={1} alignItems="center">
            {elrondToken && <LpTokenImageV2 lpToken={elrondToken} size={40} />}
            {farmInfo && (
              <Flex flexDir={"column"}>
                <Text color="white" mb={2} fontSize="md" whiteSpace={"nowrap"}>
                  BSK-EGLD
                </Text>
                <Text fontSize={"lsm"}>
                  $
                  {formatBalanceDolar(
                    { balance: farmInfo.stakedLp, decimals: 18 },
                    price,
                    true
                  )}
                </Text>
              </Flex>
            )}
          </Flex>
          <FarmInfo />
          <FarmMainButtons isOpen={isOpen} />
        </Flex>
        <Collapse in={isOpen}>
          <StakedInfo />
        </Collapse>
      </Box>

      <Text mt={20}>
        Don't have any LP tokens? Buy LP{" "}
        <Box as={Link} to={routeNames.swapLp} color="primary">
          here
        </Box>
      </Text>
    </Center>
  );
};

export default FarmComponent;
