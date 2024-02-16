import prisma from "@/lib/db";
import { verifyAdmins } from "@/lib/mx-utils";
import { IBaseTicket } from "@/types/tickets.interface";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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

  let payload = (await req.json()) as Partial<IBaseTicket>;
  console.log({ payload });

  try {
    const updated = await prisma.ticket.update({
      data: payload,
      where: {
        id: params.id,
      },
    });

    return Response.json({ message: "success", ticket: updated });
  } catch (error) {
    console.log("Ticket saving error", error);

    return Response.json({ error });
  }
}
