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

  const walletName = process.env.WALLET_NAME;
  const existingWallet = await prisma.wallet.findUnique({
    where: { name: walletName },
  });

  if (!existingWallet && walletName) {
    if (!process.env.BSK_SOURCE_PK_ENCRYPTED) {
      throw new Error("BSK_SOURCE_PK env variable is not set");
    }
    const encryptedPK = process.env.BSK_SOURCE_PK_ENCRYPTED; // only for dev

    await prisma.wallet.create({
      data: {
        name: walletName,
        encryptedSeed: encryptedPK,
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
