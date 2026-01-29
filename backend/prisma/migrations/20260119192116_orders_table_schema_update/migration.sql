/*
  Warnings:

  - A unique constraint covering the columns `[razorPayOrderId]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "razorPayPaymentId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "note" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Orders_razorPayOrderId_key" ON "Orders"("razorPayOrderId");
