import Divider from "@/components/Divider/Divider";
import TokenImage from "@/components/TokenImage/TokenImage";
import { Button } from "@/components/ui/button";
import useGetMultipleElrondTokens from "@/hooks/useGetMultipleElrondTokens";
import { getSmartContractInteraction } from "@/services/sc";
import { formatBalance } from "@/utils/functions/formatBalance";
import { useGetNftsStakedInfo, useGetUserInfo } from "../../lib/nfts-hooks";

export default function Info() {
  const { totalNftsStaked, totalRewarded, totalUsers } = useGetNftsStakedInfo();

  const { rewardsTokens } = useGetUserInfo();
  const { tokens } = useGetMultipleElrondTokens(
    rewardsTokens.map((t) => t.identifier)
  );

  const handleClaimRewards = () => {
    getSmartContractInteraction("mintingStakingNftWsp").scCall({
      functionName: "claimRewards",
    });
  };
  return (
    <div className="bg-[#3a393954] p-6 rounded-lg">
      <div>
        <h2 className="text-2xl font-bold mb-4">NFTs</h2>
        <p className="text-sm mb-8">
          <a className="text-blue-500 hover:underline" href="#">
            How it works?
          </a>
        </p>
        <div className="mb-6">
          <p className="mb-2">
            Total users: <span className="font-semibold">{totalUsers}</span>
          </p>
          <p className="mb-2">
            Total rewarded : <span className="font-semibold">0</span>
          </p>
          <p className="mb-2">
            Total staked NFTs:{" "}
            <span className="font-semibold">{totalNftsStaked}</span>
          </p>
        </div>
      </div>
      <Divider />
      <div>
        <div className="mb-6 mt-10">
          {tokens.length > 0 ? (
            <p className="mb-2 text-center">
              Your uncollected rewards{" "}
              <span className="font-semibold text-center">
                {tokens.map((t) => {
                  return (
                    <span
                      key={t.identifier}
                      className="flex items-center gap-1 justify-center"
                    >
                      <span>
                        {formatBalance({
                          balance:
                            rewardsTokens.find(
                              (rt) => rt.identifier === t.identifier
                            )?.amount || 0,
                        })}
                      </span>
                      <span>
                        <TokenImage size={20} src={t.assets.svgUrl} />
                      </span>
                    </span>
                  );
                })}
              </span>
            </p>
          ) : (
            <p className="mb-2">You have no rewards to collect</p>
          )}
        </div>
        <Button className="w-full" onClick={handleClaimRewards}>
          COLLECT
        </Button>
      </div>
    </div>
  );
}
