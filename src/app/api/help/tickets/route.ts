import prisma from "@/lib/db";
import { verifyAdmins } from "@/lib/mx-utils";
import { TicketStatus } from "@/types/tickets.interface";

export async function GET(
  req: Request,
  {
    params,
  }: { params: { status: string; viewed?: boolean; replied?: boolean } }
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

  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        status: params?.status || TicketStatus.ACTIVE,
        viewed: params?.viewed,
        replied: params?.replied,
      },
      include: {
        user: {
          include: {
            xAccount: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({ message: "success", tickets });
  } catch (error) {
    console.log("Email sending error", error);

    return Response.json({ error });
  }
}
