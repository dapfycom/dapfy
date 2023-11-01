import prisma from "@/lib/db";
import { z } from "zod";

const dataSchema = z.object({
  address: z.string().startsWith("erd"),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  const dataFronFronted = {
    address,
  };

  let data;

  try {
    data = dataSchema.parse(await dataFronFronted);
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }

  const userData = await prisma.purchase.findMany({
    where: {
      user: {
        address: data.address,
      },
    },
    orderBy: {
      createdAt: "desc",
    },

    select: {
      createdAt: true,
      product: {
        select: {
          name: true,
        },
      },
      quantity: true,
      txHash: true,
      totalCost: true,
      id: true,
    },
  });
  console.log({ userData });

  return Response.json(
    { history: userData },
    {
      status: 200,
    }
  );
}
