-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Successful');

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "razorPayOrderId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "note" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
