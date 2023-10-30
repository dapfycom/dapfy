import {
  encryptPrivateKey,
  generateEncryptionPassword,
} from "@/utils/functions/crypto";
import { z } from "zod";

const dataSchema = z.object({
  secretHex: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  let data;

  try {
    data = dataSchema.parse(await req.json());
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }

  const password = generateEncryptionPassword(data.password);
  const encryptedPK = encryptPrivateKey(data.secretHex, password);

  return Response.json({ encryptedPK: encryptedPK }, { status: 200 });
}
