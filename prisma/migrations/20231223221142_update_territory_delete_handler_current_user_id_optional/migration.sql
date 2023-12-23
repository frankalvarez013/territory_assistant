-- DropForeignKey
ALTER TABLE "Territory" DROP CONSTRAINT "Territory_currentUserID_fkey";

-- AlterTable
ALTER TABLE "Territory" ALTER COLUMN "currentUserID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Territory" ADD CONSTRAINT "Territory_currentUserID_fkey" FOREIGN KEY ("currentUserID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
