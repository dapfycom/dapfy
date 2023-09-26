import TokenImage from "@/components/TokenImage/TokenImage";
import { selectedNetwork } from "@/config/network";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import {
  formatBalance,
  formatBalanceDolar,
} from "@/utils/functions/formatBalance";
import {
  useGetBskRewards,
  useGetFarmUserInfo,
  useGetFarmsInfo,
} from "@/views/FarmView/utils/hooks";
import { Loader2 } from "lucide-react";
const StakedDetails = () => {
  const { data: userFarmInfo, isLoading } = useGetFarmUserInfo();
  const { data: farmInfo } = useGetFarmsInfo();
  const { earnedBsk } = useGetBskRewards();
  if (isLoading)
    return (
      <div className="flex w-full justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (!userFarmInfo || !farmInfo) return null;

  return (
    <div className="pb-6 flex w-full gap-7 justify-between flex-col lg:flex-row items-center">
      <StakedDetail
        title="BSK-EGLD"
        value={userFarmInfo?.lpActive}
        decimals={18}
        tokenI={selectedNetwork.tokensID.bskwegld}
        withPrice
      />
      <StakedDetail
        title="BSK Earned"
        value={earnedBsk}
        decimals={16}
        tokenI={selectedNetwork.tokensID.bsk}
      />
    </div>
  );
};

export default StakedDetails;

interface IStakedDetail {
  title: string;
  value: string;
  decimals: number;
  tokenI: string;
  withPrice?: boolean;
}

const StakedDetail = ({
  title,
  value,
  tokenI,
  decimals,
  withPrice,
}: IStakedDetail) => {
  const [price] = useGetTokenPrice(tokenI);

  return (
    <div className="flex gap-3">
      <TokenImage tokenI={tokenI} size={40} />{" "}
      <div className="flex flex-col gap-1">
        <p>{title}</p>
        <p className="text-sm">
          {formatBalance({ balance: value, decimals: decimals })}
        </p>
        {withPrice && price && (
          <p className="text-sm">
            ≈ $
            {formatBalanceDolar({ balance: value, decimals: decimals }, price)}
          </p>
        )}
      </div>
    </div>
  );
};
