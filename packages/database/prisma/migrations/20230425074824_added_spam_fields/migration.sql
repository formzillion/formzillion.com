-- AlterTable
ALTER TABLE "form_submissions" ADD COLUMN     "isSpam" BOOLEAN;

-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "customHoneypot" TEXT,
ADD COLUMN     "customSpamWords" TEXT[];
