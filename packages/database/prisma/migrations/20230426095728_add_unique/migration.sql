/*
  Warnings:

  - A unique constraint covering the columns `[billing_customer_id]` on the table `teams` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "teams_billing_customer_id_key" ON "teams"("billing_customer_id");
