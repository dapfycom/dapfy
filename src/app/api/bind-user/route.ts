import prisma from "@/lib/db";
import { IUserX } from "@/types/rewards.interface";
import { z } from "zod";

const dataSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  profile_image_url: z.string(),
  address: z.string(),
});

export const POST = async (req: Request) => {
  let userData: IUserX & { address: string };
  try {
    userData = dataSchema.parse(await req.json());
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      address: userData.address,
    },
  });

  try {
    if (user) {
      prisma.xAcount.update({
        where: {
          userId: user.id,
        },
        data: {
          name: userData.name,
          username: userData.username,
          profile_image_url: userData.profile_image_url,
          xid: userData.id,
        },
      });
    } else {
      prisma.xAcount.create({
        data: {
          name: userData.name,
          username: userData.username,
          profile_image_url: userData.profile_image_url,
          xid: userData.id,
          user: {
            create: {
              address: userData.address,
            },
          },
        },
      });
    }
  } catch (error: any) {
    console.log(error);
    return Response.json({ error: "Unknow error" }, { status: 500 });
  }

  return Response.json({ message: "success" }, { status: 200 });
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const xid = searchParams.get("xid");
  if (!xid) {
    return Response.json({ error: "No user X account id" }, { status: 400 });
  }
  try {
    const user = await prisma.xAcount.findUnique({
      where: {
        xid: xid,
      },
      include: {
        user: true,
      },
    });

    return Response.json({ user }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Unknow error" }, { status: 500 });
  }
};
