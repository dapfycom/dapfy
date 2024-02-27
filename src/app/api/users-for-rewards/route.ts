import prisma from "@/lib/db";
import { verifyAdmins } from "@/lib/mx-utils";
import { isUsername } from "@/utils/functions/validations";
import { NextResponse } from "next/server";
import { z } from "zod";

const dataSchema = z.object({
  users: z.array(
    z.object({
      user_id: z.string(),
    })
  ),
});
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

  let payload;
  try {
    payload = dataSchema.parse(await req.json());
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }

  const blackList = await prisma.blackListRewards.findMany();
  const blackListIds = blackList
    .map((b) => b.identifier)
    .filter((identifer) => !isUsername(identifer));
  const blackListUsernames = blackList
    .map((b) => b.identifier)
    .filter((identifer) => isUsername(identifer));

  const xAccountRes = await prisma.xAcount.findMany({
    where: {
      xid: {
        in: payload.users.map((u) => u.user_id),
        notIn: blackListIds,
      },
      username: {
        notIn: blackListUsernames,
      },
    },
    include: {
      user: true,
    },
  });

  const usersAddress = xAccountRes.map((xAccount) => {
    return {
      ...xAccount,
      address: xAccount.user.address,
    };
  });

  return NextResponse.json({ data: usersAddress });
};
