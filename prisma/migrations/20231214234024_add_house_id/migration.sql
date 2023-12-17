/*
  Warnings:

  - The primary key for the `House` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `congregationID` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseID` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "House" DROP CONSTRAINT "House_pkey",
ADD COLUMN     "congregationID" TEXT NOT NULL,
ADD COLUMN     "houseID" INTEGER NOT NULL,
ADD CONSTRAINT "House_pkey" PRIMARY KEY ("territoryID", "houseID", "congregationID");

-- AlterTable
ALTER TABLE "Territory" ALTER COLUMN "territoryID" DROP DEFAULT;
DROP SEQUENCE "Territory_territoryID_seq";

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_congregationID_fkey" FOREIGN KEY ("congregationID") REFERENCES "Congregation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
