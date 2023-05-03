/*
  Warnings:

  - You are about to drop the column `key` on the `apps` table. All the data in the column will be lost.
  - You are about to drop the column `appName` on the `connections` table. All the data in the column will be lost.
  - You are about to drop the column `appsId` on the `connections` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `forms` table. All the data in the column will be lost.
  - The primary key for the `workflows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `app_id` on the `workflows` table. All the data in the column will be lost.
  - You are about to drop the column `connection_id` on the `workflows` table. All the data in the column will be lost.
  - You are about to drop the column `workflowConfig` on the `workflows` table. All the data in the column will be lost.
  - The `id` column on the `workflows` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_projectsToteams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `form_connections` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `apps` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `apps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appSlug` to the `connections` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `connections` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `team_id` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `form_id` to the `workflows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_projectsToteams" DROP CONSTRAINT "_projectsToteams_A_fkey";

-- DropForeignKey
ALTER TABLE "_projectsToteams" DROP CONSTRAINT "_projectsToteams_B_fkey";

-- DropForeignKey
ALTER TABLE "connections" DROP CONSTRAINT "connections_appsId_fkey";

-- DropForeignKey
ALTER TABLE "form_connections" DROP CONSTRAINT "form_connections_connection_id_fkey";

-- DropForeignKey
ALTER TABLE "form_connections" DROP CONSTRAINT "form_connections_form_id_fkey";

-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_project_id_fkey";

-- DropIndex
DROP INDEX "apps_key_key";

-- AlterTable
ALTER TABLE "apps" DROP COLUMN "key",
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "connections" DROP COLUMN "appName",
DROP COLUMN "appsId",
ADD COLUMN     "appId" TEXT,
ADD COLUMN     "appSlug" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "forms" DROP COLUMN "project_id",
ADD COLUMN     "team_id" TEXT NOT NULL,
ADD COLUMN     "workflowId" INTEGER;

-- AlterTable
ALTER TABLE "workflows" DROP CONSTRAINT "workflows_pkey",
DROP COLUMN "app_id",
DROP COLUMN "connection_id",
DROP COLUMN "workflowConfig",
ADD COLUMN     "form_id" TEXT NOT NULL,
ADD COLUMN     "team_id" TEXT,
ADD COLUMN     "user_id" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'Default workflow',
ADD CONSTRAINT "workflows_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "_projectsToteams";

-- DropTable
DROP TABLE "form_connections";

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'action',
    "template" JSONB,
    "app_id" TEXT NOT NULL,
    "workflow_id" INTEGER NOT NULL,
    "connection_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "apps_slug_key" ON "apps"("slug");

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_appId_fkey" FOREIGN KEY ("appId") REFERENCES "apps"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "apps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "workflows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_connection_id_fkey" FOREIGN KEY ("connection_id") REFERENCES "connections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
