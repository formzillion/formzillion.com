/*
  Warnings:

  - You are about to drop the column `form_id` on the `connections` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `connections` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "connections" DROP COLUMN "form_id",
DROP COLUMN "provider",
ADD COLUMN     "appName" TEXT,
ADD COLUMN     "appsId" TEXT,
ADD COLUMN     "name" TEXT DEFAULT '';

-- CreateTable
CREATE TABLE "apps" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'in_active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "appConfig" JSONB NOT NULL,

    CONSTRAINT "apps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflows" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'active',
    "app_id" TEXT NOT NULL,
    "connection_id" TEXT NOT NULL,
    "workflowConfig" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workflows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "apps_key_key" ON "apps"("key");

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_appsId_fkey" FOREIGN KEY ("appsId") REFERENCES "apps"("id") ON DELETE SET NULL ON UPDATE CASCADE;
