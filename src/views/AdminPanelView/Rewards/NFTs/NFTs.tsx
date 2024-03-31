import { Button } from "@/components/ui/button";
import { selectedNetwork } from "@/config/network";
import { getSmartContractInteraction } from "@/services/sc";
import {
  Address,
  AddressValue,
  BytesType,
  BytesValue,
  List,
  ListType,
  U64Value,
} from "@multiversx/sdk-core/out";

const NFTs = () => {
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

  const handleSetCreateRole = () => {
    getSmartContractInteraction("mintingStakingNftWsp").scCall({
      functionName: "setLocalRoles",
      gasL: 100_000_000,
    });
  };

  const handleMintSft = (cid: string) => {
    const ipfsServer = "https://ipfs.io/ipfs/";
    getSmartContractInteraction("mintingStakingNftWsp").scCall({
      functionName: "mintNft",
      arg: [BytesValue.fromUTF8(ipfsServer + cid)],
      gasL: 100_000_000,
    });
  };

  const handleAutoStake = (address: string, nonce: number) => {
    getSmartContractInteraction("mintingStakingNftWsp").scCall({
      functionName: "autoStake",
      arg: [new AddressValue(Address.fromBech32(address)), new U64Value(nonce)],
      gasL: 10_000_000,
    });
  };

  const handleAddRewards = () => {
    getSmartContractInteraction("mintingStakingNftWsp").EGLDPayment({
      functionName: "addRewards",
      value: 0.3,
      gasL: 10_000_000,
    });
  };

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
    <div className="flex gap-6 flex-col">
      <Button onClick={handleIssueSft}>Issue SFT</Button>
      <Button onClick={handleSetCreateRole}>Set Create Role</Button>
      <Button
        onClick={() =>
          handleMintSft("QmXY73Kw9NMX2BjBmqA532FHepPNLBxnjnhy4w3i66RqKz")
        }
      >
        Mint SFT
      </Button>
      <Button
        onClick={() =>
          handleAutoStake(
            "erd19fcgs4xjtv0ym9wdz6afdam7r6n6xepglldp5v2w207v6ax4q5yqcj9874",
            1
          )
        }
      >
        Auto Stake
      </Button>
      <Button onClick={handleAddAllowedTokens}>Set Tokens Rewards</Button>

      <Button onClick={handleAddRewards}>Add Rewards</Button>
    </div>
  );
};

export default NFTs;
