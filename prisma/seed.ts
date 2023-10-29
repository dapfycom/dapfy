import { selectedNetwork } from "@/config/network";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingProduct = await prisma.product.findUnique({
    where: { name: selectedNetwork.tokensID.bsk },
  });

  if (!existingProduct) {
    await prisma.product.create({
      data: {
        name: selectedNetwork.tokensID.bsk,
        stock: Number(process.env.INITIAL_TOKENS_STOCK || "0"),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
