import { Button } from "@/components/ui/button";
import { getSmartContractInteraction } from "@/services/sc";
import { useGetUserInfo } from "../../lib/nfts-hooks";

const Unstake = () => {
  const { userNfts } = useGetUserInfo();

  const handleUnstake = () => {
    getSmartContractInteraction("mintingStakingNftWsp").scCall({
      functionName: "unStake",
      gasL: 100_000_000,
    });
  };
  return (
    <div className="bg-[#3a393954] p-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Staked NFTs</h3>
      <p className="text-sm mb-6">
        Staked: <span className="font-semibold">{userNfts.length}</span>
      </p>
      <Button className="w-full  " onClick={handleUnstake}>
        Unstake NFT
      </Button>
    </div>
  );
};

export default Unstake;
