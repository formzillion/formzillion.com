/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `teams` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `teams` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `teams` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "teams_slug_key" ON "teams"("slug");
