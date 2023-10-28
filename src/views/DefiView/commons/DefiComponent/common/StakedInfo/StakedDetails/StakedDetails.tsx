import { selectedNetwork } from "@/config/network";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import {
  formatBalance,
  formatBalanceDolar,
} from "@/utils/functions/formatBalance";
import { calcStakedAmount } from "@/views/DefiView/utils/functions";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { FarmContext } from "../../../DefiComponent";
const StakedDetails = () => {
  const { hatomFarm, deposits, userRewards } = useContext(FarmContext);
  const { elrondToken: depositedToken, isLoading: isloadingDepositToken } =
    useGetElrondToken(hatomFarm?.moneyMarket.tokenI || null);

  const { elrondToken: rewardToken, isLoading: isLoadingRewardToken } =
    useGetElrondToken(selectedNetwork.tokensID.usdc);

  const staked = deposits ? calcStakedAmount(deposits) : "0";

  if (isLoadingRewardToken || isloadingDepositToken) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );
  }
  return (
    <div className="pb-6 flex w-full gap-7 justify-between flex-col lg:flex-row items-center">
      {depositedToken && (
        <StakedDetail
          title="Staked amount"
          value={staked}
          decimals={depositedToken.decimals}
          tokenI={depositedToken.identifier}
          withPrice
          logoUrl={depositedToken.assets.svgUrl}
        />
      )}
      {rewardToken && (
        <StakedDetail
          title={`Current ${rewardToken.ticker} earned`}
          value={userRewards?.rewards || "0"}
          decimals={rewardToken.decimals}
          tokenI={rewardToken.identifier}
          logoUrl={rewardToken.assets.svgUrl}
        />
      )}
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
