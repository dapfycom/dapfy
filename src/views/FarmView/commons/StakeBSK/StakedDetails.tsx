import TokenImage from "@/components/TokenImage/TokenImage";
import { selectedNetwork } from "@/config/network";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import { cn } from "@/lib/utils";
import {
  formatBalance,
  formatBalanceDollar,
} from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { useGetStakeBskUserInfo } from "../../utils/hooks";
interface IProps {
  onModal?: boolean;
}

const StakedDetails = ({ onModal }: IProps) => {
  const { data } = useGetStakeBskUserInfo();
  const { elrondToken: token } = useGetElrondToken(
    selectedNetwork.tokensID.bsk || null
  );

  if (!data.rewards) return null;

  return (
    <div
      className={cn(
        "pb-6 flex w-full gap-7 justify-between flex-col lg:flex-row items-center",
        onModal ? "lg:flex-col items-baseline" : ""
      )}
    >
      <StakedDetail
        title={`Deposited ${formatTokenI(token?.identifier)}`}
        value={data?.staked}
        decimals={token?.decimals}
        tokenI={token?.identifier}
        withPrice
      />

      <StakedDetail
        title={`Earned ${formatTokenI(token?.identifier)}`}
        value={data.rewards}
        decimals={token?.decimals}
        tokenI={token?.identifier}
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
