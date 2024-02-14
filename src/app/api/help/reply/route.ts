import prisma from "@/lib/db";
import { sendTicketReplayEmail } from "@/lib/emails";
import { verifyAdmins } from "@/lib/mx-utils";
import { z } from "zod";

const payloadSchema = z.object({
  email: z.string(),
  message: z.string(),
  id: z.string(),
});
export async function POST(req: Request) {
  // authorization user to this route
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const ok = verifyAdmins(token || "");
  if (!ok) {
    return Response.json(
      {
        message: "invalid signature",
        data: {
          token,
          isValid: ok,
        },
      },
      {
        status: 403,
      }
    );
  }
  // end authorization

  let payload;
  try {
    payload = payloadSchema.parse(await req.json());
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }

  const { email, message, id } = payload;

  try {
    await sendTicketReplayEmail(email, message);
    await prisma.ticket.update({
      data: {
        replied: true,
      },
      where: {
        id: id,
      },
    });
    return Response.json({ message: "success" });
  } catch (error) {
    console.log("Send reply error", error);

    return Response.json(
      { message: "Error send reply email" },
      { status: 500 }
    );
  }
}
