import prisma from "@/lib/db";

export const GET = async () => {
  try {
    const usersAvatars = await prisma.xAcount.findMany({
      select: {
        profile_image_url: true,
      },
    });
    return Response.json({ usersAvatars }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }
};
