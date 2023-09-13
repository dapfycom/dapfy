import { Flex, Spinner, Text } from "@chakra-ui/react";
import TokenImage from "components/TokenImage/TokenImage";
import { selectedNetwork } from "config/network";
import useGetTokenPrice from "hooks/useGetTokenPrice";
import {
  formatBalance,
  formatBalanceDolar,
} from "utils/functions/formatBalance";
import {
  useGetBskRewards,
  useGetFarmUserInfo,
  useGetFarmsInfo,
} from "views/FarmView/utils/hooks";
const StakedDetails = () => {
  const { data: userFarmInfo, isLoading } = useGetFarmUserInfo();
  const { data: farmInfo } = useGetFarmsInfo();
  const { earnedBsk } = useGetBskRewards();
  if (isLoading)
    return (
      <Flex w="full" justifyContent="center">
        <Spinner />
      </Flex>
    );

  if (!userFarmInfo || !farmInfo) return null;

  return (
    <Flex
      w="full"
      gap={7}
      justifyContent="space-between"
      flexDir={{ xs: "column", lg: "row" }}
      alignItems={"center"}
    >
      <StakedDetail
        title="BSK-EGLD"
        value={userFarmInfo?.lpActive}
        decimals={18}
        tokenI={selectedNetwork.tokensID.bskwegld}
      />
      <StakedDetail
        title="BSK Earned"
        value={earnedBsk}
        decimals={16}
        tokenI={selectedNetwork.tokensID.bsk}
      />
    </Flex>
  );
};

export default StakedDetails;

interface IStakedDetail {
  title: string;
  value: string;
  decimals: number;
  tokenI: string;
}

const StakedDetail = ({ title, value, tokenI, decimals }: IStakedDetail) => {
  const [price] = useGetTokenPrice(tokenI);

  return (
    <Flex gap={3}>
      <TokenImage tokenI={tokenI} size={40} />{" "}
      <Flex flexDir={"column"} gap={1}>
        <Text>{title}</Text>
        <Text fontSize={"lsm"} color="white">
          {formatBalance({ balance: value, decimals: decimals })}
        </Text>
        {price && (
          <Text fontSize={"lsm"}>
            ≈ $
            {formatBalanceDolar({ balance: value, decimals: decimals }, price)}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
