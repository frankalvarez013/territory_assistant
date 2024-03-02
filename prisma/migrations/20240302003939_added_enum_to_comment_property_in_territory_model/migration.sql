-- CreateEnum
CREATE TYPE "TerritoryComment" AS ENUM ('Expired', 'Unassigned', 'Assigned');

-- AlterTable
ALTER TABLE "Territory" ADD COLUMN     "activity" "TerritoryComment" NOT NULL DEFAULT 'Unassigned';
