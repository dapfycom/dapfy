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
import { useContext } from "react";
import { AshFarmContext } from "../../FarmOneDex";
import { formatTokenI } from "@/utils/functions/tokens";

const FarmInfo = () => {
  const { farm } = useContext(AshFarmContext);
  const { data: userFarmInfo, isLoading } = useGetFarmUserInfo();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  if (!farm) return null;
  return (
    <div
      className={`flex gap-7  flex-col lg:flex-row flex-1 ${
        userFarmInfo ? "justify-end" : "justify-center"
      } `}
    >
      {farm && (
        <>
          <FarmDetail
            title={`Staked ${formatTokenI(farm.first_token_id)}`}
            value={farm.total_deposited_amount}
            decimals={18}
            tokenI={farm.first_token_id}
          />
          <FarmDetail
            title={`Staked ${formatTokenI(farm.second_token_id)}`}
            value={farm.total_deposited_farm_amount}
            decimals={18}
            tokenI={farm.second_token_id}
          />

          <FarmDetail
            title={`Staked ${formatTokenI(farm.lp_token_id)}`}
            value={farm.total_deposited_lp_amount}
            decimals={18}
            tokenI={farm.lp_token_id}
          />
          {/* <FarmDetail
            title="Earned BSK"
            value={earnedBsk}
            decimals={16}
            tokenI={selectedNetwork.tokensID.bsk}
          /> */}
        </>
      )}
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
