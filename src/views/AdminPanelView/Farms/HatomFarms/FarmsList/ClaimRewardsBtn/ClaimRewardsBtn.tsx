import { Button } from "@/components/ui/button";
import { getSmartContractInteraction } from "@/services/sc";
import { Address, AddressValue } from "@multiversx/sdk-core/out";
import { useContext } from "react";
import { FarmContext } from "../FarmItem";

const ClaimRewardsBtn = () => {
  const { hatomFarm } = useContext(FarmContext);
  console.log({
    hatomFarm,
  });

  const handleClick = () => {
    getSmartContractInteraction("hatomParentWsp").scCall({
      functionName: "claimRewards",
      arg: [
        new AddressValue(new Address(hatomFarm?.moneyMarket.childScAddress)),
      ],
    });
  };
  return (
    <Button
      className="text-sm w-full bg-green-600 text-white hover:text-green-500"
      onClick={handleClick}
    >
      Claim rewards
    </Button>
  );
};

export default ClaimRewardsBtn;
