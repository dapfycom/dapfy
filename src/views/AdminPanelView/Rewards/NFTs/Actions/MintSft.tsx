import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSmartContractInteraction } from "@/services/sc";
import { BytesValue } from "@multiversx/sdk-core/out";
import { useState } from "react";
const MintSft = () => {
  const [cid, setCid] = useState("");

  const handleMintSft = (
    cid: string = "QmXY73Kw9NMX2BjBmqA532FHepPNLBxnjnhy4w3i66RqKz"
  ) => {
    const ipfsServer = "https://ipfs.io/ipfs/";
    getSmartContractInteraction("mintingStakingNftWsp").scCall({
      functionName: "mintNft",
      arg: [BytesValue.fromUTF8(ipfsServer + cid)],
      gasL: 100_000_000,
    });
  };
  return (
    <div className="flex flex-col gap-3 w-full max-w-[300px] border rounded-2xl px-5 py-10">
      <div>3. </div>
      <Input placeholder="CID" onChange={(e) => setCid(e.target.value)} />
      <Button onClick={() => handleMintSft(cid)} className="w-full">
        Mint SFT
      </Button>
    </div>
  );
};

export default MintSft;
