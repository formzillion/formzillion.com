-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "name" TEXT,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';