import prisma from "@/lib/db";
import { verifyAdmins } from "@/lib/mx-utils";
import axiosRewards from "@/services/rest/rewards";
import { IUserTasks } from "@/types/rewards.interface";

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

  const tasks = await axiosRewards.get<IUserTasks[]>("tasks/all");
  const usersThatCompleteTwitterTask = tasks.data.filter(
    (t) => t.comment && t.like && t.mention && t.rt
  );

  const users = await prisma.xAcount.findMany({
    where: {
      xid: {
        in: usersThatCompleteTwitterTask.map((t) => t.user_id),
      },
    },
    include: {
      user: {
        select: {
          address: true,
        },
      },
    },
  });
  return Response.json(
    {
      users: users,
    },
    {
      status: 200,
    }
  );
}
