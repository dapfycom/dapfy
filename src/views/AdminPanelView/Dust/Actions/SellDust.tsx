import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSmartContractInteraction } from "@/services/sc";
import { BytesValue } from "@multiversx/sdk-core/out";
import { useState } from "react";
const SellDust = () => {
  const [token, setToken] = useState("");

  const handleAddAllowedTokens = () => {
    getSmartContractInteraction("dustWsp").scCall({
      functionName: "sellDust",
      arg: [BytesValue.fromUTF8(token)],
      gasL: 10_000_000,
    });
  };
  return (
    <div className="flex flex-col gap-3 w-full max-w-[300px] border rounded-2xl px-5 py-10">
      <Label className="text-muted-foreground">To swap token to: </Label>
      <Input
        placeholder="BSK-baa025"
        onChange={(e) => setToken(e.target.value)}
      />
      <Button onClick={handleAddAllowedTokens} className="w-full max-w-[300px]">
        Swap to
      </Button>
    </div>
  );
};

export default SellDust;
