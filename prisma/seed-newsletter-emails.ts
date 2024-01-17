import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  const data = fs.readFileSync(path.join(__dirname, "demo.csv"), "utf-8");
  const lines = data.split("\n");
  console.log({ lines });

  for (const line of lines) {
    const [id, email] = line.split(",");
    console.log({ email });

    try {
      await prisma.newsletter.create({
        data: {
          email,
        },
      });
    } catch (error) {
      console.log("Problem with ", email);
      //   console.log(error);
    }
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
