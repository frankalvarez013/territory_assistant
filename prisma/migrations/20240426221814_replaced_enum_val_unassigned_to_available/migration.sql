/*
  Warnings:

  - The values [Unassigned] on the enum `TerritoryComment` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TerritoryComment_new" AS ENUM ('Expired', 'Available', 'Assigned');
ALTER TABLE "Territory" ALTER COLUMN "activity" DROP DEFAULT;
ALTER TABLE "Territory" ALTER COLUMN "activity" TYPE "TerritoryComment_new" USING ("activity"::text::"TerritoryComment_new");
ALTER TYPE "TerritoryComment" RENAME TO "TerritoryComment_old";
ALTER TYPE "TerritoryComment_new" RENAME TO "TerritoryComment";
DROP TYPE "TerritoryComment_old";
ALTER TABLE "Territory" ALTER COLUMN "activity" SET DEFAULT 'Available';
COMMIT;

-- AlterTable
ALTER TABLE "Territory" ALTER COLUMN "activity" SET DEFAULT 'Available';
