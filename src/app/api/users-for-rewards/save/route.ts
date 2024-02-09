import prisma from "@/lib/db";
import { z } from "zod";
const dataSchema = z.object({
  users: z.array(
    z.object({
      coin: z.string(),
      userId: z.string(),
    })
  ),
});
export const POST = async (req: Request) => {
  let payload: {
    users: {
      coin: string;
      userId: string;
    }[];
  };
  try {
    payload = dataSchema.parse(await req.json());
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }

  try {
    await prisma.reward.createMany({
      data: payload.users.map((u) => {
        return {
          coin: u.coin,
          userId: u.userId,
        };
      }),
    });

    return Response.json(
      {
        message: "Reward saved!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log({ error });

    return Response.json(
      {
        message: "Internal Error",
      },
      {
        status: 500,
      }
    );
  }
};
