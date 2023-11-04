import prisma from "@/lib/db";
import { z } from "zod";

export const POST = async (req: Request) => {
  try {
  } catch (error) {}
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
  } catch (error: any) {
    if (error?.code === "P2002") {
      return Response.json({ error: "Email already exist" }, { status: 400 });
    }
    return Response.json({ error: "Unknow error" }, { status: 500 });
  }

  return Response.json({ message: "success" }, { status: 200 });
};
