-- CreateEnum
CREATE TYPE "ErrorPriority" AS ENUM ('Undefined', 'Critical', 'High', 'Low', 'Fixed');

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('Free', 'Premium');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "otpVerified" BOOLEAN NOT NULL DEFAULT false,
    "identifierKey" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "city" TEXT,
    "timezone" TEXT,
    "dateAndFormat" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "subscription_tier" "SubscriptionTier" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Errors" (
    "id" SERIAL NOT NULL,
    "errorName" TEXT NOT NULL,
    "errorDesc" TEXT NOT NULL,
    "errorPriority" "ErrorPriority",
    "errorDateAndTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "errorResolveDateAndTime" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Errors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactDetails" (
    "id" SERIAL NOT NULL,
    "telegramChatIds" TEXT[],
    "discordChatIds" TEXT[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ContactDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_identifierKey_key" ON "User"("identifierKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ContactDetails_userId_key" ON "ContactDetails"("userId");

-- AddForeignKey
ALTER TABLE "Errors" ADD CONSTRAINT "Errors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactDetails" ADD CONSTRAINT "ContactDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
