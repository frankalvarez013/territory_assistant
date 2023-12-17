/*
  Warnings:

  - The primary key for the `HouseCounter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `TerritoryID` on the `HouseCounter` table. All the data in the column will be lost.
  - Added the required column `territoryID` to the `HouseCounter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HouseCounter" DROP CONSTRAINT "HouseCounter_pkey",
DROP COLUMN "TerritoryID",
ADD COLUMN     "territoryID" TEXT NOT NULL,
ADD CONSTRAINT "HouseCounter_pkey" PRIMARY KEY ("territoryID");
