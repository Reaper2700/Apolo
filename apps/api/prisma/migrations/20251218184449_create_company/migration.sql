/*
  Warnings:

  - You are about to drop the column `date_of_payment` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `trade_name` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tradeName]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tradeName` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Company_trade_name_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "date_of_payment",
DROP COLUMN "trade_name",
ADD COLUMN     "dateOfPayment" TIMESTAMP(3),
ADD COLUMN     "tradeName" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- CreateIndex
CREATE UNIQUE INDEX "Company_tradeName_key" ON "Company"("tradeName");
