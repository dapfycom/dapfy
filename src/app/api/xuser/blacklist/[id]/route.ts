import prisma from "@/lib/db";
import { verifyAdmins } from "@/lib/mx-utils";

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
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

  const id = params.id; // 'a', 'b', or 'c'

  try {
    await prisma.blackListRewards.delete({
      where: {
        id: id,
      },
    });
    return Response.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log("Prisma on error", error);

    return Response.json({ error: "Unknow error" }, { status: 500 });
  }
};
