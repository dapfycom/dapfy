/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `XAcount` table. All the data in the column will be lost.
  - You are about to drop the `RewardsEmailReport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RewardsEmailReport" DROP CONSTRAINT "RewardsEmailReport_xAccountId_fkey";

-- AlterTable
ALTER TABLE "XAcount" DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "RewardsEmailReport";
