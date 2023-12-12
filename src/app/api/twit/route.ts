import { Address } from "@multiversx/sdk-core/out";
import { UserPublicKey, UserVerifier } from "@multiversx/sdk-wallet";
export const POST = async (req: Request) => {
  let { data: nativeAuthToken, signature, currentAddress } = await req.json();

  let pubKey = new UserPublicKey(new Address(currentAddress).pubkey());

  let verifier = new UserVerifier(pubKey);

  const res = await verifier.verify(
    "ZXJkMXR3cGd3eXUyaGQwanJ4M3EydXlwdW04dndoZ3ZtMmp2bDY2bnN3cTBsazlmZTM3eGtkZHFrcDkydjA.YUhSMGNEb3ZMMnh2WTJGc2FHOXpkRG96TURBeC4yZWFlN2ZlOTFjOWQzMTZlYmYzY2JkYmI1Y2Y2NmQ1ZjgyYTAxNjA5MmIwODg3YzBkMmVmZWEwODU2ZTI4MGFhLjg2NDAwLmV5SjBhVzFsYzNSaGJYQWlPakUzTURJek5EUTBNemw5.7783507d89fd8465f31fe986e8b0af0d2f0694c2ee736362015014b20aaccfd7d7a3b4c50d9f3f3cfd9848a5529503a64c9a9193fc6ad25061da6d123179860c",
    Buffer.from(
      "7783507d89fd8465f31fe986e8b0af0d2f0694c2ee736362015014b20aaccfd7d7a3b4c50d9f3f3cfd9848a5529503a64c9a9193fc6ad25061da6d123179860c"
    )
  );

  console.log("all fine here");

  console.log({
    addresGeneratedByPubKey: pubKey.toAddress().bech32(),
    currentAddress: currentAddress,
    data: nativeAuthToken,
    signature: signature,
    verifier: verifier.verify(nativeAuthToken, Buffer.from(signature)),
  });
  //   if (verifier.verify(data, Buffer.from(signature, "hex"))) {
  //     const res = await writeTweet({
  //       text: "Hello Viewers!",
  //     });

  return Response.json(
    {
      message: "success",
      data: res,
    },
    {
      status: 200,
    }
  );
};
