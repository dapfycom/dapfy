import { admins } from "@/views/AdminPanelView/data";
import { Address, SignableMessage } from "@multiversx/sdk-core/out";
import { UserVerifier } from "@multiversx/sdk-wallet";
import prisma from "./db";

export function verifyAuthTokenSignature(
  address: string,
  authToken: string,
  signature: string
): boolean {
  const verifier = UserVerifier.fromAddress(new Address(address));

  const message = new SignableMessage({
    message: Buffer.from(`${address}${authToken}`),
  });

  const serializedMessage = message.serializeForSigning();
  const ok = verifier.verify(serializedMessage, Buffer.from(signature, "hex"));
  return ok;
}

export const verifyUser = async (
  userData: {
    address?: string;
    id?: string;
  },
  token?: string
): Promise<boolean> => {
  if (!token) {
    return false;
  }
  let authToken: string = token.split(":")[0];
  let signature: string = token.split(":")[1];

  const address = userData.address;
  const id = userData.id;

  if (!address && !id) {
    return false;
  }

  if (address) {
    const ok = verifyAuthTokenSignature(address, authToken, signature);
    return ok;
  }

  if (id) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return false;
    }

    const ok = verifyAuthTokenSignature(user.address, authToken, signature);
    return ok;
  }

  return false;
};

export function verifyAdmins(token?: string) {
  if (!token) {
    return false;
  }
  if (process.env.ADMIN_TOKEN === token) {
    return true;
  }
  let authToken: string = token.split(":")[0];
  let signature: string = token.split(":")[1];

  for (let admin of admins) {
    const ok = verifyAuthTokenSignature(admin, authToken, signature);
    if (ok) return ok;
  }

  return false;
}
