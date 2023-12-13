import { admins } from "@/views/AdminPanelView/data";
import { Address, SignableMessage } from "@multiversx/sdk-core/out";
import { UserVerifier } from "@multiversx/sdk-wallet";
export function verifyAuthTokenSignature(
  address: string,
  authToken: string,
  signature: string
): boolean {
  const verifier = UserVerifier.fromAddress(new Address(address));

  const message = new SignableMessage({
    message: Buffer.from(`${address}${authToken}{}`),
  });

  const serializedMessage = message.serializeForSigning();
  const ok = verifier.verify(serializedMessage, Buffer.from(signature, "hex"));
  return ok;
}

export function verifyAdmins(token: string) {
  let authToken: string = token.split(":")[0];
  let signature: string = token.split(":")[1];

  for (let admin of admins) {
    const ok = verifyAuthTokenSignature(admin, authToken, signature);
    if (ok) return true;
  }

  return false;
}
