import prisma from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/emails";
import { verifyAdmins } from "@/lib/mx-utils";
import { z } from "zod";

export const POST = async (req: Request) => {
  let email;
  try {
    email = z
      .string()
      .email()
      .parse((await req.json()).email);
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }

  try {
    await prisma.newsletter.create({
      data: {
        email: email,
      },
    });

    await sendWelcomeEmail(email);
  } catch (error: any) {
    if (error?.code === "P2002") {
      return Response.json({ error: "Email already exist" }, { status: 400 });
    }
    console.log("Prisma error", error);

    return Response.json({ error: "Unknow error" }, { status: 500 });
  }

  return Response.json({ message: "success" }, { status: 200 });
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
