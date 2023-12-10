/*
  Warnings:

  - The primary key for the `Territory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `territoryID` column on the `Territory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Congregation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address]` on the table `Congregation` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `territoryID` on the `House` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_territoryID_fkey";

-- AlterTable
ALTER TABLE "House" DROP COLUMN "territoryID",
ADD COLUMN     "territoryID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Territory" DROP CONSTRAINT "Territory_pkey",
DROP COLUMN "territoryID",
ADD COLUMN     "territoryID" SERIAL NOT NULL,
ADD CONSTRAINT "Territory_pkey" PRIMARY KEY ("territoryID", "congregationID");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id", "congregationID");

-- CreateIndex
CREATE UNIQUE INDEX "Congregation_id_key" ON "Congregation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Congregation_address_key" ON "Congregation"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Territory_territoryID_key" ON "Territory"("territoryID");

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_territoryID_fkey" FOREIGN KEY ("territoryID") REFERENCES "Territory"("territoryID") ON DELETE RESTRICT ON UPDATE CASCADE;
