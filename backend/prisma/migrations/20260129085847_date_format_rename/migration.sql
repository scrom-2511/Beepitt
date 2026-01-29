/*
  Warnings:

  - You are about to drop the column `dateAndFormat` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dateAndFormat",
ADD COLUMN     "dateFormat" TEXT;
