import LpTokenImage from "@/components/LpTokenImage/LpTokenImage";
import { selectedNetwork } from "@/config/network";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import {
  formatBalance,
  formatBalanceDollar,
  formatNumber,
} from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { OneDexFarmContext } from "@/views/FarmView/commons/FarmOneDex/FarmOneDex";
import { useGetApr } from "@/views/FarmView/commons/FarmOneDex/utils/hooks";
import { useContext } from "react";

const FarmItem = () => {
  const { farm } = useContext(OneDexFarmContext);
  const lpTokenIdentifier = farm?.lp_token_id || "";

  const { elrondToken: egldToken } = useGetElrondToken(
    selectedNetwork.tokensID.egld
  );
  const { elrondToken } = useGetElrondToken(lpTokenIdentifier);
  const { apr, error, isLoading: isLoadingApr } = useGetApr();

  if (!farm) return null;

  return (
    <div className="text-left">
      <div className="max-w-[24rem] border rounded-lg p-6">
        <div>
          <div className="flex items-center gap-3">
            {" "}
            <h3 className="text-lg font-semibold ">
              {formatTokenI(farm.first_token_id)}-
              {formatTokenI(farm.second_token_id)}
            </h3>
            {elrondToken && <LpTokenImage lpToken={elrondToken} />}
          </div>
        </div>

        <p className="text-sm text-green-600 mb-1">Active</p>
        <p className="text-sm font-medium mb-2">
          {apr?.gt(0) && (
            <div className="flex gap-3">
              <p className="whitespace-nowrap mb-2 " color="white">
                APR
              </p>
              <p className=" whitespace-nowrap text-muted-foreground">
                ≈ {formatNumber(apr?.toString())} %
              </p>
            </div>
          )}
        </p>
        {egldToken && (
          <p className="text-sm  flex gap-2 mb-2">
            TVL{" "}
            {
              <span className="text-muted-foreground">
                $
                {formatBalanceDollar(
                  {
                    balance: farm.total_deposited_amount,
                    decimals: egldToken.decimals,
                  },
                  egldToken.price,
                  true
                )}
              </span>
            }
          </p>
        )}
        {elrondToken && (
          <p className="text-sm">
            Total Rewards :{" "}
            <span className="text-muted-foreground text-sm">
              {formatBalance({
                balance: farm.total_lp_rewards,
                decimals: elrondToken.decimals,
              })}{" "}
              {formatTokenI(elrondToken.identifier)}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default FarmItem;
