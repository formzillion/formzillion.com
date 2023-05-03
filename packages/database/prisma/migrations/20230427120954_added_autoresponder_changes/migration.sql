-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "autoResponder" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "autoResponderConfig" JSONB;