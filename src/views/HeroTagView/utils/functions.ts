import { Address, SmartContract } from "@multiversx/sdk-core/out";
import Keccak from "keccak";

export const dnsScAddressForHerotag = (herotag: string) => {
  const hashedHerotag = Keccak("keccak256").update(herotag).digest();

  const initialAddress = Buffer.from(Array(32).fill(1));
  const initialAddressSlice = initialAddress.slice(0, 30);
  const scId = hashedHerotag.slice(31);

  const deployer_pubkey = Buffer.concat([
    initialAddressSlice,
    Buffer.from([0, scId.readUIntBE(0, 1)]),
  ]);

  const scAddress = SmartContract.computeAddress(
    new Address(deployer_pubkey),
    0
  );

  return scAddress.bech32();
};
