/*
  Warnings:

  - You are about to drop the column `invoice_status` on the `invoice` table. All the data in the column will be lost.
  - Added the required column `status` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoice" DROP COLUMN "invoice_status",
ADD COLUMN     "status" TEXT NOT NULL;
