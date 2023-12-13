/*
  Warnings:

  - You are about to drop the column `address` on the `Territory` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Territory` table. All the data in the column will be lost.
  - Added the required column `currentUserID` to the `Territory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Territory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Territory" DROP CONSTRAINT "Territory_userID_fkey";

-- AlterTable
ALTER TABLE "House" ALTER COLUMN "comment" DROP NOT NULL,
ALTER COLUMN "dateVisited" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Territory" DROP COLUMN "address",
DROP COLUMN "userID",
ADD COLUMN     "currentUserID" TEXT NOT NULL,
ADD COLUMN     "location" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "Territory" ADD CONSTRAINT "Territory_currentUserID_fkey" FOREIGN KEY ("currentUserID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
