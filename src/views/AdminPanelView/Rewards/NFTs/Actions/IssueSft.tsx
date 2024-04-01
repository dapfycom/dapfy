import { Button } from "@/components/ui/button";
import { getSmartContractInteraction } from "@/services/sc";
import { BytesValue } from "@multiversx/sdk-core/out";

const IssueSft = () => {
  const handleIssueSft = () => {
    getSmartContractInteraction("mintingStakingNftWsp").EGLDPayment({
      functionName: "issueNft",
      arg: [
        BytesValue.fromUTF8("DapfyTrophies"),
        BytesValue.fromUTF8("Streaks".toUpperCase()),
        BytesValue.fromUTF8("TROPHY"),
      ],
      gasL: 100_000_000,
      value: 0.05,
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-[300px] border rounded-2xl px-5 py-10">
      <div>1. </div>
      <Button onClick={handleIssueSft} className="w-full max-w-[300px]">
        Issue SFT
      </Button>
    </div>
  );
};

export default IssueSft;
