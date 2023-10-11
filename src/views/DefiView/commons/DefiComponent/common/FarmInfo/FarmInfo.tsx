import { selectedNetwork } from "@/config/network";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import {
  formatBalance,
  formatBalanceDolar,
} from "@/utils/functions/formatBalance";
import {
  useGetBskRewards,
  useGetFarmUserInfo,
} from "@/views/FarmView/utils/hooks";
import { Loader2 } from "lucide-react";

const FarmInfo = () => {
  const { data: userFarmInfo, isLoading } = useGetFarmUserInfo();

  const { earnedBsk } = useGetBskRewards();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`flex gap-7  flex-col lg:flex-row flex-1 ${
        userFarmInfo ? "justify-end" : "justify-center"
      } `}
    >
      {userFarmInfo && (
        <>
          <FarmDetail
            title={"Staked amount"}
            value={userFarmInfo?.lpActive}
            decimals={18}
            tokenI={selectedNetwork.tokensID.bskwegld}
          />
          <FarmDetail
            title="Earned USDC"
            value={earnedBsk}
            decimals={16}
            tokenI={selectedNetwork.tokensID.bsk}
          />
        </>
      )}

      <div className="flex flex-col">
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
      </div>
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
