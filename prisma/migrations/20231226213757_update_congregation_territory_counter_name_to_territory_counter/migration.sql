/*
  Warnings:

  - The primary key for the `HouseCounter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `CongregationTerritoryCounter` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[territoryID,congregationID]` on the table `HouseCounter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `congregationID` to the `HouseCounter` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "HouseCounter_territoryID_key";

-- AlterTable
ALTER TABLE "HouseCounter" DROP CONSTRAINT "HouseCounter_pkey",
ADD COLUMN     "congregationID" INTEGER NOT NULL,
ADD CONSTRAINT "HouseCounter_pkey" PRIMARY KEY ("territoryID", "congregationID");

-- DropTable
DROP TABLE "CongregationTerritoryCounter";

-- CreateTable
CREATE TABLE "TerritoryCounter" (
    "congregationID" TEXT NOT NULL,
    "nextTerritoryID" INTEGER NOT NULL,

    CONSTRAINT "TerritoryCounter_pkey" PRIMARY KEY ("congregationID")
);

-- CreateIndex
CREATE UNIQUE INDEX "HouseCounter_territoryID_congregationID_key" ON "HouseCounter"("territoryID", "congregationID");
