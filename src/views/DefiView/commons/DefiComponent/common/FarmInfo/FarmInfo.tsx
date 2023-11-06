import { selectedNetwork } from "@/config/network";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import {
  formatBalance,
  formatBalanceDolar,
} from "@/utils/functions/formatBalance";

import useGetElrondToken from "@/hooks/useGetElrondToken";
import { calcStakedAmount } from "@/views/DefiView/utils/functions";
import { Loader2 } from "lucide-react";
import { useContext } from "react";
import { FarmContext } from "../../DefiComponent";

const FarmInfo = () => {
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
    <div
      className={`flex gap-7  flex-col lg:flex-row flex-1 ${
        depositedToken ? "justify-end" : "justify-center"
      } `}
    >
      {/* {depositedToken && (
        <FarmDetail
          title="My staked amount"
          value={staked}
          decimals={depositedToken.decimals}
          tokenI={depositedToken.identifier}
        />
      )}
      {rewardToken && (
        <FarmDetail
          title={`Current ${rewardToken.ticker} earned`}
          value={userRewards?.rewards || "0"}
          decimals={rewardToken.decimals}
          tokenI={rewardToken.identifier}
        />
      )} */}
      <div className="flex gap-2">
        <Loader2 className="animate-spin" /> Optimising for the best APR
      </div>
      {/* <div className="flex flex-col">
        <p className="whitespace-nowrap mb-2 " color="white">
          APR
        </p>
        <p className="text-[12px] whitespace-nowrap text-muted-foreground">
          245 %
        </p>
      </div>

      <div className="flex flex-col">
        <p className="whitespace-nowrap mb-2 " color="white">
          APY
        </p>
        <p className="text-[12px] whitespace-nowrap text-muted-foreground">
          156 %
        </p>
      </div> */}
    </div>
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
    <div className="flex flex-col">
      <p className="whitespace-nowrap mb-2 " color="white">
        {title}
      </p>
      <p className="text-[12px] whitespace-nowrap text-muted-foreground">
        <div>{formatBalance({ balance: value, decimals: decimals })}</div>
        <div>
          ≈ ${" "}
          {formatBalanceDolar(
            { balance: value, decimals: decimals },
            price,
            true
          )}
        </div>
      </p>
    </div>
  );
};
