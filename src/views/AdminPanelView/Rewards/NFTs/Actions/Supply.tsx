import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSmartContractInteraction } from "@/services/sc";
import { useState } from "react";
const Supply = () => {
  const [amount, setAmount] = useState("");

  const handleAddRewards = () => {
    getSmartContractInteraction("mintingStakingNftWsp").EGLDPayment({
      functionName: "addRewards",
      value: amount,
      gasL: 10_000_000,
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-[300px] border rounded-2xl px-5 py-10">
      <div>6. </div>
      <Label className="text-muted-foreground">
        Add rewards to the users that currently have the NFT
      </Label>
      <Input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <Button onClick={handleAddRewards} className="w-full max-w-[300px]">
        Add Rewards
      </Button>
    </div>
  );
};

export default Supply;
