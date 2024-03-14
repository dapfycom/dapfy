import prisma from "@/lib/db";
import { verifyUser } from "@/lib/mx-utils";

export async function GET(
  req: Request,
  { params }: { params: { address: string } }
) {
  // authorization user to this route
  const token = req.headers.get("Authorization")?.split(" ")[1];

  const ok = await verifyUser(
    {
      address: params.address,
    },
    token
  );
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
    const user = await prisma.xAcount.findFirst({
      where: {
        user: {
          address: params.address,
        },
      },
      select: {
        username: true,
        profile_image_url: true,
      },
    });

    return Response.json({ message: "success", user });
  } catch (error) {
    return Response.json({ error });
  }
}
