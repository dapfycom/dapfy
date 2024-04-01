import { Button } from "@/components/ui/button";
import { getSmartContractInteraction } from "@/services/sc";
const SetScRole = () => {
  const handleSetCreateRole = () => {
    getSmartContractInteraction("mintingStakingNftWsp").scCall({
      functionName: "setLocalRoles",
      gasL: 100_000_000,
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-[300px] border rounded-2xl px-5 py-10">
      {" "}
      <div>2. </div>
      <Button onClick={handleSetCreateRole} className="w-full max-w-[300px]">
        Set Create Role
      </Button>
    </div>
  );
};

export default SetScRole;
