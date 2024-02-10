import { PrismaClient } from "@prisma/client";
import { users_rewards } from "./seed-dats";

const prisma = new PrismaClient();

async function main() {
  try {
    for (let index = 0; index < users_rewards.length; index++) {
      const usser_r = users_rewards[index];
      await prisma.reward.create({
        data: {
          coin: "EGLD",
          user: {
            connect: {
              address: usser_r.address,
            },
          },
          rewardedAt: new Date("2024-02-09"),
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
