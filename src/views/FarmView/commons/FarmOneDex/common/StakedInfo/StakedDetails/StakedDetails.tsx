import { LpTokenImageV2 } from "@/components/LpTokenImage/LpTokenImage";
import TokenImage from "@/components/TokenImage/TokenImage";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import { cn } from "@/lib/utils";
import {
  formatBalance,
  formatBalanceDollar,
} from "@/utils/functions/formatBalance";
import { Loader2 } from "lucide-react";
import { useGetOneDexDepositEntries } from "../../../utils/hooks";

interface IProps {
  onModal?: boolean;
}

const StakedDetails = ({ onModal }: IProps) => {
  const { depositEntries, isLoading, error } = useGetOneDexDepositEntries();

  const { elrondToken: lpToken } = useGetElrondToken(
    depositEntries?.lp_id || null
  );
  const { elrondToken: tokenId } = useGetElrondToken(
    depositEntries?.token_id || null
  );

  if (isLoading)
    return (
      <div className="flex w-full justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (!depositEntries) return null;

  return (
    <div
      className={cn(
        "pb-6 flex w-full gap-7 justify-between flex-col lg:flex-row items-center",
        onModal ? "lg:flex-col items-baseline" : ""
      )}
    >
      <StakedDetail
        title={`Deposited ${depositEntries.token_id}`}
        value={depositEntries?.deposited_amount}
        decimals={tokenId?.decimals}
        tokenI={depositEntries.token_id}
        withPrice
      />
      {/* <StakedDetail
        title={`Deposited ${formatTokenI(depositEntries.lp_id)}`}
        value={depositEntries?.deposited_lp_amount}
        decimals={lpToken?.decimals}
        tokenI={depositEntries.lp_id}
        withPrice
      /> */}
      <StakedDetail
        title={`Earned LP Rewards (auto-compounded)`}
        value={depositEntries.rewards}
        decimals={lpToken?.decimals}
        tokenI={depositEntries.lp_id}
        isLp
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
  isLp?: boolean;
}

const StakedDetail = ({
  title,
  value,
  tokenI,
  decimals,
  withPrice,
  isLp,
}: IStakedDetail) => {
  const [price] = useGetTokenPrice(tokenI);
  const { elrondToken } = useGetElrondToken(tokenI);
  return (
    <div className="flex gap-3">
      {isLp ? (
        <LpTokenImageV2 lpToken={elrondToken} size={40} />
      ) : (
        <TokenImage tokenI={tokenI} size={40} />
      )}
      <div className="flex flex-col gap-1">
        <p className="text-sm">{title}</p>
        <div className="flex gap-2">
          <p className="text-sm">
            {formatBalance({ balance: value, decimals: decimals })}
          </p>
          {withPrice && price && (
            <p className="text-sm">
              ≈ $
              {formatBalanceDollar(
                { balance: value, decimals: decimals },
                price
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
