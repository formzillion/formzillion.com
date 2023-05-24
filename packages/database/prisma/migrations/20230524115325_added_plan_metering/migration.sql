-- CreateTable
CREATE TABLE "plan_metering" (
    "id" SERIAL NOT NULL,
    "submission_counter" INTEGER NOT NULL DEFAULT 0,
    "member_counter" INTEGER NOT NULL DEFAULT 0,
    "form_counter" INTEGER NOT NULL DEFAULT 0,
    "planId" TEXT NOT NULL,
    "planName" TEXT,
    "teamId" TEXT NOT NULL,
    "teamSlug" TEXT,

    CONSTRAINT "plan_metering_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "plan_metering_teamId_idx" ON "plan_metering"("teamId");

-- AddForeignKey
ALTER TABLE "plan_metering" ADD CONSTRAINT "plan_metering_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
