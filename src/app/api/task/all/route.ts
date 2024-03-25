import prisma from "@/lib/db";
import { verifyAdmins } from "@/lib/mx-utils";
import { serverAxiosDapfy } from "@/services/rest/dapfy-api";
import { IUserTasks } from "@/types/rewards.interface";
import { addDays, format } from "date-fns";

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
  let current = true;
  const { searchParams } = new URL(req.url);
  let date = searchParams.get("date");
  const currentDate = new Date();

  let finalUsers;
  if (!date && currentDate.getUTCHours() < 16) {
    current = true;
    const tasks = await serverAxiosDapfy.get<IUserTasks[]>("/task");
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
    current = false;

    if (!date) {
      date = format(currentDate, "yyyy-MM-dd");
    }
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
      current: current,
    },
    {
      status: 200,
    }
  );
}
