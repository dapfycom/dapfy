import prisma from "@/lib/db";
import { addressIsValid } from "@/lib/utils";
import { z } from "zod";

const payloadSchema = z.object({
  address: z.string().refine(addressIsValid, {
    message: "Address is not valid",
  }),
  email: z.string().email(),
  message: z.string(),
});
export async function POST(req: Request) {
  let payload;
  try {
    payload = payloadSchema.parse(await req.json());
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }

  const { address, email, message } = payload;

  try {
    await prisma.ticket.create({
      data: {
        message,
        responseEmail: email,
        user: {
          connectOrCreate: {
            where: {
              address,
            },
            create: {
              address,
            },
          },
        },
      },
    });

    return Response.json({ message: "success" });
  } catch (error) {
    console.log("Ticket saving error", error);

    return Response.json({ error });
  }
}
