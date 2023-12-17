/*
  Warnings:

  - The primary key for the `HouseCounter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[territoryID]` on the table `HouseCounter` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `territoryID` on the `HouseCounter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "HouseCounter" DROP CONSTRAINT "HouseCounter_pkey",
DROP COLUMN "territoryID",
ADD COLUMN     "territoryID" INTEGER NOT NULL,
ADD CONSTRAINT "HouseCounter_pkey" PRIMARY KEY ("territoryID");

-- CreateIndex
CREATE UNIQUE INDEX "HouseCounter_territoryID_key" ON "HouseCounter"("territoryID");
