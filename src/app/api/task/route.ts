import prisma from "@/lib/db";
import { verifyAdmins } from "@/lib/mx-utils";
import axiosRewards from "@/services/rest/rewards";
import { IDapfyUserTasks, IUserTasks } from "@/types/rewards.interface";
import { addDays } from "date-fns";

export async function GET(req: Request) {
  const tasks = await axiosRewards.get<IUserTasks[]>("tasks/all");

  let databaseTasks: any[] = [];
  const currentDate = new Date();
  // take from yesterday at 16 to today 16
  if (currentDate.getUTCHours() < 16) {
    // yesterday at 4pm
    const yesterday = addDays(new Date(), -1);
    yesterday.setUTCHours(16, 0, 0, 0);

    databaseTasks = await prisma.usersTasks.findMany({
      where: {
        updatedAt: {
          gte: yesterday,
          lt: new Date(),
        },
      },
    });
  } else {
    // take from today at 16 to tomorrow 16
    const today = new Date();
    today.setUTCHours(16, 0, 0, 0);

    databaseTasks = await prisma.usersTasks.findMany({
      where: {
        updatedAt: {
          gte: today,
          lt: new Date(),
        },
      },
    });
  }

  let response: IUserTasks[] = [];
  // if there is no task in the database, update the task from api for response
  if (databaseTasks.length === 0) {
    response = tasks.data;
  } else {
    response = tasks.data.map((t) => {
      const databaseTask = databaseTasks.find(
        (dbt) => dbt.xuserId === t.user_id
      );

      let updatedTask = t;

      if (databaseTask) {
        updatedTask = {
          ...t,
          mention:
            databaseTask.mention === "auto"
              ? t.mention
              : databaseTask.mention === "true",
          comment:
            databaseTask.comment === "auto"
              ? t.comment
              : databaseTask.comment === "true",
          like:
            databaseTask.like === "auto"
              ? t.like
              : databaseTask.like === "true",
          rt: databaseTask.rt === "auto" ? t.rt : databaseTask.rt === "true",
        };
      }
      return updatedTask;
    });
  }

  return Response.json(response, {
    status: 200,
  });
}

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

  const body = await req.json();
  const tasks: IDapfyUserTasks = body;

  if (
    !(
      validateTask(tasks.mention) &&
      validateTask(tasks.comment) &&
      validateTask(tasks.like) &&
      validateTask(tasks.rt)
    )
  ) {
    return Response.json(
      {
        message: "invalid task",
        data: {
          mention: tasks.mention,
          comment: tasks.comment,
          like: tasks.like,
          rt: tasks.rt,
        },
      },
      {
        status: 400,
      }
    );
  }

  await prisma.usersTasks.upsert({
    where: {
      xuserId: tasks.user_id,
    },
    create: {
      xuserId: tasks.user_id,
      mention: tasks.mention,
      comment: tasks.comment,
      like: tasks.like,
      rt: tasks.rt,
    },
    update: {
      mention: tasks.mention,
      comment: tasks.comment,
      like: tasks.like,
      rt: tasks.rt,
    },
  });

  return Response.json(
    {
      message: "task updated",
    },
    {
      status: 200,
    }
  );
}

const validateTask = (checked: string) => {
  return checked === "true" || checked === "auto" || checked === "false";
};
