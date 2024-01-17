/*
  Warnings:

  - Added the required column `updatedAt` to the `XAcount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "XAcount" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "RewardsEmailReport" (
    "id" TEXT NOT NULL,
    "xAccountId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "RewardsEmailReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RewardsEmailReport_email_key" ON "RewardsEmailReport"("email");

-- AddForeignKey
ALTER TABLE "RewardsEmailReport" ADD CONSTRAINT "RewardsEmailReport_xAccountId_fkey" FOREIGN KEY ("xAccountId") REFERENCES "XAcount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
