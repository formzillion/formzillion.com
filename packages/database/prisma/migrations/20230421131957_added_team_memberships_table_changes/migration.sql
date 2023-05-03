-- CreateEnum
CREATE TYPE "membershipRole" AS ENUM ('MEMBER', 'ADMIN', 'OWNER');

-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "appIconLogo" TEXT,
ADD COLUMN     "appLogo" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "brandColor" TEXT NOT NULL DEFAULT '#292929',
ADD COLUMN     "darkBrandColor" TEXT NOT NULL DEFAULT '#fafafa',
ADD COLUMN     "hideBranding" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "theme" TEXT;

-- CreateTable
CREATE TABLE "memberships" (
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "role" "membershipRole" NOT NULL,
    "disableImpersonation" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("userId","teamId")
);

-- CreateIndex
CREATE INDEX "memberships_teamId_idx" ON "memberships"("teamId");

-- CreateIndex
CREATE INDEX "memberships_userId_idx" ON "memberships"("userId");

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
