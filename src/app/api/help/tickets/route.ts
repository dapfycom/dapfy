import prisma from "@/lib/db";
import { verifyAdmins } from "@/lib/mx-utils";
import { TicketStatus } from "@/types/tickets.interface";

export async function GET(req: Request) {
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
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const viewed = searchParams.get("viewed");
  const replied = searchParams.get("replied");
  console.log({
    status,
    viewed,
    replied,
  });

  const filters: {
    status: string;
    viewed?: boolean;
    replied?: boolean;
  } = {
    status: status || TicketStatus.ACTIVE,
  };
  if (viewed !== null) {
    filters["viewed"] = viewed === "true";
  }
  if (replied !== null) {
    filters["replied"] = replied === "true";
  }

  console.log({ filters });

  try {
    const tickets = await prisma.ticket.findMany({
      where: filters,
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
