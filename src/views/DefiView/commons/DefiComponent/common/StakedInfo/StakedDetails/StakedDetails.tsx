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
import Image from "next/image";
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
        title="Staked amount"
        value={userFarmInfo?.lpActive}
        decimals={18}
        tokenI={selectedNetwork.tokensID.bskwegld}
        withPrice
        logoUrl="/images/hatom.png"
      />
      <StakedDetail
        title="All time USDC earned"
        value={earnedBsk}
        decimals={16}
        tokenI={selectedNetwork.tokensID.bsk}
        logoUrl="/images/usdc.svg"
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
  logoUrl: string;
}

const StakedDetail = ({
  title,
  value,
  tokenI,
  decimals,
  withPrice,
  logoUrl,
}: IStakedDetail) => {
  const [price] = useGetTokenPrice(tokenI);

  return (
    <div className="flex gap-3 items-center">
      <div className="w-[50px] h-[50px]">
        <Image src={logoUrl} alt="hatom" width={50} height={50} />{" "}
      </div>
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
