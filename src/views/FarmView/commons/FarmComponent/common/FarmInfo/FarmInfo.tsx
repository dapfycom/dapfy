import { selectedNetwork } from "@/config/network";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import {
  formatBalance,
  formatBalanceDollar,
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
        </>
      )}

      <div className="flex flex-col">
        <p className="whitespace-nowrap  " color="white">
          APR{" "}
        </p>
        <span className="text-muted-foreground mb-2">
          {" "}
          (for a limited time only)
        </span>
        <p className="text-[12px] font-bold whitespace-nowrap text-muted-foreground">
          100 %
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
        {formatBalance({ balance: value, decimals: decimals })} ≈ ${" "}
        {formatBalanceDollar(
          { balance: value, decimals: decimals },
          price,
          true
        )}
      </p>
    </div>
  );
};
