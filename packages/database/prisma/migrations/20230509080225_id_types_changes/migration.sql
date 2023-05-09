/*
  Warnings:

  - The primary key for the `apps` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `apps` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `connections` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `connections` table. All the data in the column will be lost.
  - The `id` column on the `connections` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `appId` column on the `connections` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `team_id` on table `connections` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `app_id` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `connection_id` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `type` on table `teams` required. This step will fail if there are existing NULL values in that column.
  - Made the column `team_id` on table `workflows` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "connections" DROP CONSTRAINT "connections_appId_fkey";

-- DropForeignKey
ALTER TABLE "connections" DROP CONSTRAINT "connections_team_id_fkey";

-- DropForeignKey
ALTER TABLE "connections" DROP CONSTRAINT "connections_user_id_fkey";

-- DropForeignKey
ALTER TABLE "form_submissions" DROP CONSTRAINT "form_submissions_form_id_fkey";

-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_team_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_app_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_connection_id_fkey";

-- AlterTable
ALTER TABLE "apps" DROP CONSTRAINT "apps_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "apps_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "connections" DROP CONSTRAINT "connections_pkey",
DROP COLUMN "user_id",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'inActive',
ALTER COLUMN "team_id" SET NOT NULL,
DROP COLUMN "appId",
ADD COLUMN     "appId" INTEGER,
ADD CONSTRAINT "connections_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "app_slug" TEXT,
DROP COLUMN "app_id",
ADD COLUMN     "app_id" INTEGER NOT NULL,
DROP COLUMN "connection_id",
ADD COLUMN     "connection_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "teams" ALTER COLUMN "type" SET NOT NULL;

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'defaultToken';

-- AlterTable
ALTER TABLE "workflows" ALTER COLUMN "team_id" SET NOT NULL;

-- CreateIndex
CREATE INDEX "apps_slug_idx" ON "apps"("slug");

-- CreateIndex
CREATE INDEX "connections_team_id_idx" ON "connections"("team_id");

-- CreateIndex
CREATE INDEX "form_submissions_form_id_idx" ON "form_submissions"("form_id");

-- CreateIndex
CREATE INDEX "forms_team_id_idx" ON "forms"("team_id");

-- CreateIndex
CREATE INDEX "forms_workflowId_idx" ON "forms"("workflowId");

-- CreateIndex
CREATE INDEX "tasks_app_id_idx" ON "tasks"("app_id");

-- CreateIndex
CREATE INDEX "tasks_workflow_id_idx" ON "tasks"("workflow_id");

-- CreateIndex
CREATE INDEX "teams_slug_idx" ON "teams"("slug");

-- CreateIndex
CREATE INDEX "workflows_form_id_idx" ON "workflows"("form_id");

-- CreateIndex
CREATE INDEX "workflows_team_id_idx" ON "workflows"("team_id");

-- AddForeignKey
ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_appId_fkey" FOREIGN KEY ("appId") REFERENCES "apps"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "apps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_connection_id_fkey" FOREIGN KEY ("connection_id") REFERENCES "connections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
