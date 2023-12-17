import TokenImage from "@/components/TokenImage/TokenImage";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import {
  formatBalance,
  formatBalanceDollar,
} from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { Loader2 } from "lucide-react";
import { useContext } from "react";
import { AshFarmContext } from "../../../FarmAshSwap";
import { useGetAshSwapDepositEntries } from "../../../utils/hooks";
const StakedDetails = () => {
  const { farm } = useContext(AshFarmContext);
  const { depositEntries, isLoading } = useGetAshSwapDepositEntries();

  if (isLoading)
    return (
      <div className="flex w-full justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (!depositEntries) return null;

  return (
    <div className="pb-6 flex w-full gap-7 justify-between flex-col lg:flex-row items-center">
      <StakedDetail
        title={`Deposited ${depositEntries.token_id}`}
        value={depositEntries?.deposited_amount}
        decimals={18}
        tokenI={depositEntries.token_id}
        withPrice
      />
      <StakedDetail
        title={`Deposited ${formatTokenI(depositEntries.lp_id)}`}
        value={depositEntries?.deposited_lp_amount}
        decimals={18}
        tokenI={depositEntries.lp_id}
        withPrice
      />
      <StakedDetail
        title={`Earned ${formatTokenI(depositEntries.lp_id)}`}
        value={depositEntries.rewards}
        decimals={16}
        tokenI={depositEntries.deposited_lp_amount}
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
            {formatBalanceDollar({ balance: value, decimals: decimals }, price)}
          </p>
        )}
      </div>
    </div>
  );
};
