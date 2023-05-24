-- CreateTable
CREATE TABLE "plan_metering" (
    "id" SERIAL NOT NULL,
    "submission_counter" INTEGER NOT NULL DEFAULT 0,
    "member_counter" INTEGER NOT NULL DEFAULT 0,
    "teamId" TEXT NOT NULL,
    "formId" TEXT NOT NULL,

    CONSTRAINT "plan_metering_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "plan_metering_teamId_formId_idx" ON "plan_metering"("teamId", "formId");

-- AddForeignKey
ALTER TABLE "plan_metering" ADD CONSTRAINT "plan_metering_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_metering" ADD CONSTRAINT "plan_metering_formId_fkey" FOREIGN KEY ("formId") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
