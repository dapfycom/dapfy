import prisma from "@/lib/db";
import { verifyAdmins } from "@/lib/mx-utils";
import { isUsername } from "@/utils/functions/validations";
import { z } from "zod";

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

  try {
    const users = await prisma.blackListRewards.findMany();
    const blackListedUsers = users.map((user) => {
      return {
        username: isUsername(user.identifier) ? user.identifier : "",
        xid: !isUsername(user.identifier) ? user.identifier : "",
        id: user.id,
      };
    });

    return Response.json({ message: "success", users: blackListedUsers });
  } catch (error) {
    return Response.json({ error });
  }
}

const dataSchema = z.object({
  xid: z.string(),
  username: z.string(),
});
export async function POST(req: Request) {
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

  let identifier: string;
  if (payload.username) {
    identifier = "@" + payload.username;
  } else {
    identifier = payload.xid;
  }

  try {
    const user = await prisma.blackListRewards.create({
      data: {
        identifier: identifier,
      },
    });

    return Response.json({ message: "success", user });
  } catch (error) {
    return Response.json({ error });
  }
}
