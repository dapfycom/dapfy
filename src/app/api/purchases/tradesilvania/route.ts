import prisma from "@/lib/db";
import { addressIsValid } from "@/lib/utils";
import { Address } from "@multiversx/sdk-core/out";
import { z } from "zod";

const payloadSchema = z.object({
  address: z
    .string()
    .refine((val) => addressIsValid(Address.fromHex(val).bech32()), {
      message: "Address is not valid",
    }),
});
export async function POST(req: Request) {
  let payload;
  try {
    payload = payloadSchema.parse(await req.json());
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }

  const { address } = payload;

  try {
    const userParsedAddress = Address.fromHex(address).bech32();
    await prisma.tradesilvaniaPurchase.create({
      data: {
        user: {
          connectOrCreate: {
            where: {
              address: userParsedAddress,
            },
            create: {
              address: userParsedAddress,
            },
          },
        },
      },
    });

    return Response.json({ message: "success" });
  } catch (error) {
    console.log("Ticket saving error", error);

    return Response.json({ message: "Error creating ticket" }, { status: 500 });
  }
}
