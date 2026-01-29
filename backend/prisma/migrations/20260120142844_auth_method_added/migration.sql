/*
  Warnings:

  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dateAndFormat` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `identifierKey` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `otpVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_tier` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Errors` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('LOCAL', 'GOOGLE', 'DISCORD');

-- CreateEnum
CREATE TYPE "IncidentPriority" AS ENUM ('Unseen', 'Critical', 'High', 'Low', 'Closed');

-- DropForeignKey
ALTER TABLE "Errors" DROP CONSTRAINT "Errors_userId_fkey";

-- DropIndex
DROP INDEX "User_identifierKey_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "city",
DROP COLUMN "createAt",
DROP COLUMN "dateAndFormat",
DROP COLUMN "firstName",
DROP COLUMN "identifierKey",
DROP COLUMN "lastName",
DROP COLUMN "otpVerified",
DROP COLUMN "subscription_tier",
DROP COLUMN "timezone",
DROP COLUMN "updateAt",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- DropTable
DROP TABLE "Errors";

-- DropEnum
DROP TYPE "ErrorPriority";

-- CreateTable
CREATE TABLE "AuthAccount" (
    "id" SERIAL NOT NULL,
    "provider" "AuthProvider" NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AuthAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" SERIAL NOT NULL,
    "incidentName" TEXT NOT NULL,
    "incidentDesc" TEXT NOT NULL,
    "incidentPriority" "IncidentPriority",
    "incidentDateAndTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "incidentResolveDateAndTime" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthAccount_providerId_key" ON "AuthAccount"("providerId");

-- AddForeignKey
ALTER TABLE "AuthAccount" ADD CONSTRAINT "AuthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
