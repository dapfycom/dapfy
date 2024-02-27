import prisma from "@/lib/db";
import { verifyAdmins } from "@/lib/mx-utils";

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
  const identifier = searchParams.get("identifier");

  if (!identifier) {
    return Response.json({ message: "missing identifier" }, { status: 400 });
  }
  console.log({ identifier });

  try {
    const user = await prisma.xAcount.findUnique({
      where: {
        username: identifier,
      },
      include: {
        user: true,
      },
    });

    return Response.json({ message: "success", user });
  } catch (error) {
    return Response.json({ error });
  }
}
