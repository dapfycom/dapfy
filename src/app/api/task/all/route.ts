import prisma from "@/lib/db";
import { verifyAdmins } from "@/lib/mx-utils";
import axiosRewards from "@/services/rest/rewards";
import { IUserTasks } from "@/types/rewards.interface";
import { addDays } from "date-fns";

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
  const date = searchParams.get("date");
  let finalUsers;
  if (!date) {
    const tasks = await axiosRewards.get<IUserTasks[]>("tasks/all");
    const usersThatCompleteTwitterTask = tasks.data.filter(
      (t) => t.comment && t.like && t.mention && t.rt
    );

    finalUsers = await prisma.xAcount.findMany({
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
  } else {
    const users = await prisma.reward.findMany({
      where: {
        rewardedAt: {
          gte: new Date(date),
          lt: addDays(new Date(date), 1),
        },
      },
      include: {
        user: {
          select: {
            address: true,
            xAccount: {
              include: {
                user: {
                  select: {
                    address: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    finalUsers = users.map((u) => {
      return {
        ...u.user.xAccount,
        ...u,
      };
    });
  }
  return Response.json(
    {
      users: finalUsers,
    },
    {
      status: 200,
    }
  );
}
