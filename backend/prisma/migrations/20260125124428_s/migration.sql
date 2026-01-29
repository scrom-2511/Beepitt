/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identifierKey]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifierKey` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscription_tier` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "dateAndFormat" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "identifierKey" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "otpVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subscription_tier" "SubscriptionTier" NOT NULL,
ADD COLUMN     "timezone" TEXT,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_identifierKey_key" ON "User"("identifierKey");
