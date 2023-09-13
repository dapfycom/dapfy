import { Flex, Spinner, Text } from "@chakra-ui/react";
import { selectedNetwork } from "config/network";
import useGetTokenPrice from "hooks/useGetTokenPrice";
import {
  formatBalance,
  formatBalanceDolar,
} from "utils/functions/formatBalance";
import {
  useGetBskRewards,
  useGetFarmUserInfo,
} from "views/FarmView/utils/hooks";

const FarmInfo = () => {
  const { data: userFarmInfo, isLoading } = useGetFarmUserInfo();

  const { earnedBsk } = useGetBskRewards();

  if (isLoading) {
    return (
      <Flex flex={1} justifyContent="center">
        <Spinner />
      </Flex>
    );
  }
  if (!userFarmInfo) return null;

  return (
    <Flex gap={7} fontSize="lsm" flexDir={{ xs: "column", lg: "row" }}>
      <FarmDetail
        title={"Staked LP"}
        value={userFarmInfo?.lpActive}
        decimals={18}
        tokenI={selectedNetwork.tokensID.bskwegld}
      />
      <FarmDetail
        title="Earned BSK"
        value={earnedBsk}
        decimals={16}
        tokenI={selectedNetwork.tokensID.bsk}
      />
    </Flex>
  );
};

export default FarmInfo;

interface FarmDetailProps {
  title: string;
  value: string;
  tokenI: string;
  decimals: number;
}

const FarmDetail = ({ title, value, decimals, tokenI }: FarmDetailProps) => {
  const [price] = useGetTokenPrice(tokenI);

  return (
    <Flex flexDir="column" flex={1}>
      <Text color="white" whiteSpace={"nowrap"} mb={2}>
        {title}
      </Text>
      <Text fontSize={"lsm"} whiteSpace={"nowrap"}>
        {formatBalance({ balance: value, decimals: decimals })} ≈ ${" "}
        {formatBalanceDolar(
          { balance: value, decimals: decimals },
          price,
          true
        )}
      </Text>
    </Flex>
  );
};
