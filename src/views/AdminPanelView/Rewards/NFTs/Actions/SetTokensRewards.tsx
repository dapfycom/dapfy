import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectedNetwork } from "@/config/network";
import { getSmartContractInteraction } from "@/services/sc";
import {
  BytesType,
  BytesValue,
  List,
  ListType,
} from "@multiversx/sdk-core/out";
import { useState } from "react";
const SetTokensRewards = () => {
  const [tokens, setTokens] = useState("");

  const handleAddAllowedTokens = () => {
    const listType = new ListType(new BytesType());
    getSmartContractInteraction("mintingStakingNftWsp").scCall({
      functionName: "addAllowedTokens",
      arg: [
        new List(listType, [
          BytesValue.fromUTF8(selectedNetwork.tokensID.egld),
          BytesValue.fromUTF8(selectedNetwork.tokensID.wegld),
        ]),
      ],
      gasL: 10_000_000,
    });
  };
  return (
    <div className="flex flex-col gap-3 w-full max-w-[300px] border rounded-2xl px-5 py-10">
      <div>4. </div>
      <Label className="text-muted-foreground">
        Tokens to reward users separated by coma
      </Label>
      <Input
        placeholder="EGLD, WEGLD-2156a"
        onChange={(e) => setTokens(e.target.value)}
      />

      <Button onClick={handleAddAllowedTokens} className="w-full max-w-[300px]">
        Set Tokens Rewards
      </Button>
    </div>
  );
};

export default SetTokensRewards;
