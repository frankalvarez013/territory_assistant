/*
  Warnings:

  - The primary key for the `HouseCounter` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "HouseCounter" DROP CONSTRAINT "HouseCounter_pkey",
ALTER COLUMN "territoryID" SET DATA TYPE TEXT,
ADD CONSTRAINT "HouseCounter_pkey" PRIMARY KEY ("territoryID", "congregationID");
