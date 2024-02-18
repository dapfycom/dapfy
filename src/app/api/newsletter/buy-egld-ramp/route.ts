import prisma from "@/lib/db";
import { sendBuyEgldEmail } from "@/lib/emails";
import { verifyAdmins } from "@/lib/mx-utils";

export const POST = async (req: Request) => {
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
    const newsletters = await prisma.newsletter.findMany();
    const emails = newsletters.map((n) => n.email);

    await sendBuyEgldEmail(emails);
    return Response.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }
};

export const GET = async (req: Request) => {
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
    const newsletters = await prisma.newsletter.findMany();
    return Response.json({ newsletters }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }
};
