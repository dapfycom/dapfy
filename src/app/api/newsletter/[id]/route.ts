import prisma from "@/lib/db";

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id; // 'a', 'b', or 'c'

  try {
    await prisma.newsletter.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log("Prisma on error", error);

    return Response.json({ error: "Unknow error" }, { status: 500 });
  }

  return Response.json({ message: "success" }, { status: 200 });
};
