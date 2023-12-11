"use client";
import { Button } from "@/components/ui/button";
import useGetMultipleElrondTokens from "@/hooks/useGetMultipleElrondTokens";
import { getSmartContractInteraction } from "@/services/sc";
import { fetchScSimpleData } from "@/services/sc/queries";
import { formatBalance } from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { integrator } from "@/views/SwapAggregator/lib/constants";
import { Address, AddressValue, U64Value } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import useSWR from "swr";
const AggregatorView = () => {
  const { data } = useSWR("Claimable Aggregator Fee", () => {
    return fetchScSimpleData<{ amount: BigNumber; token: string }[]>(
      "ashSwapAggregatorWsp:getClaimabeProtocolFee",
      [
        new AddressValue(new Address(integrator)),
        new U64Value(new BigNumber(0)),
        new U64Value(new BigNumber(10)),
      ]
    );
  });

  const { tokens } = useGetMultipleElrondTokens(
    data?.map((item) => item.token) || []
  );

  const handleClaimFee = () => {
    getSmartContractInteraction("ashSwapAggregatorWsp").scCall({
      functionName: "claimProtocolFee",

      arg: [new AddressValue(new Address(integrator))],
    });
  };

  const rewards = tokens.map((token) => {
    const rewardToken = data?.find(
      (item) => item.token === token.identifier
    ) || { amount: new BigNumber(0), token: token.identifier };
    return {
      ...token,
      ...rewardToken,
    };
  });
  return (
    <div className="h-full px-4 py-6 lg:px-8 ">
      <div className="border-none p-0 outline-none text-center h-full flex justify-center flex-col items-center w-full">
        <div className="max-w-[300px]">
          <div className="mb-1">Accumulated rewards</div>
          <div className="mb-4">
            {rewards.map((item, index) => {
              return (
                <div key={item.identifier}>
                  {formatBalance({
                    balance: item.amount,
                    decimals: item.decimals,
                  })}{" "}
                  {formatTokenI(item.identifier)}
                </div>
              );
            })}
          </div>
          <Button onClick={handleClaimFee}>Claim Rewards</Button>
        </div>
      </div>
    </div>
  );
};

export default AggregatorView;
