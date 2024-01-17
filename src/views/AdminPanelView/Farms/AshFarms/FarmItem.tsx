import LpTokenImage from "@/components/LpTokenImage/LpTokenImage";
import { selectedNetwork } from "@/config/network";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import {
  formatBalance,
  formatBalanceDollar,
  formatNumber,
} from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { AshFarmContext } from "@/views/FarmView/commons/FarmAshSwap/FarmAshSwap";
import { ArrowRight } from "lucide-react";
import { useContext } from "react";

const FarmItem = () => {
  const { farm, ashSwapInfo } = useContext(AshFarmContext);
  const lpTokenIdentifier = farm?.lp_token_id || "";

  const { elrondToken } = useGetElrondToken(lpTokenIdentifier);
  const { elrondToken: egldToken } = useGetElrondToken(
    selectedNetwork.tokensID.egld
  );
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
            {elrondToken && (
              <LpTokenImage
                token1lp={farm.first_token_id}
                token2lp={farm.second_token_id}
              />
            )}
          </div>
        </div>

        <p className="text-sm text-green-600 mb-1">Active</p>
        <p className="text-sm font-medium mb-4">
          {ashSwapInfo && (
            <div className="flex  items-center">
              <span>APR </span>
              <div className="h-8 px-2.5 space-x-1.5 border border-black bg-stake-gray-500/10 flex items-center text-sm font-bold text-muted-foreground">
                <div>
                  <span className="underline">
                    {formatNumber(ashSwapInfo?.totalAPRMin)}
                  </span>
                  <span className="text-2xs">%</span>
                </div>
                <ArrowRight className="w-3 h-auto" />
                <div>
                  <span className="underline">
                    {formatNumber(ashSwapInfo?.totalAPRMax)}
                  </span>
                  <span className="text-2xs">%</span>
                </div>
              </div>
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
                balance: farm.total_farm_rewards,
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
