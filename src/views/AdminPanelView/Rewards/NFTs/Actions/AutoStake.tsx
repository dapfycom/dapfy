import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSmartContractInteraction } from "@/services/sc";
import { Address, AddressValue, U64Value } from "@multiversx/sdk-core/out";
import { useState } from "react";
const AutoStake = () => {
  const [address, setAddress] = useState("");
  const [nonce, setNonce] = useState(1);

  const handleAutoStake = (address: string, nonce: number) => {
    getSmartContractInteraction("mintingStakingNftWsp").scCall({
      functionName: "autoStake",
      arg: [new AddressValue(Address.fromBech32(address)), new U64Value(nonce)],
      gasL: 10_000_000,
    });
  };
  return (
    <div className="flex flex-col gap-3 w-full max-w-[300px] border rounded-2xl px-5 py-10">
      <div>5. </div>

      <Label className="text-muted-foreground">
        Allow the contract to stake the nft for the user
      </Label>
      <Input
        placeholder="User address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <Input
        placeholder="nonce"
        onChange={(e) =>
          setNonce(
            isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)
          )
        }
        value={nonce}
      />

      <Button
        onClick={() => handleAutoStake(address, nonce)}
        className="w-full max-w-[300px]"
      >
        Auto Stake
      </Button>
    </div>
  );
};

export default AutoStake;
