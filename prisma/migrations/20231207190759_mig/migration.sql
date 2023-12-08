/*
  Warnings:

  - You are about to alter the column `congregationName` on the `Congregation` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The primary key for the `House` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `territoryID` on the `House` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `StreetAd` on the `House` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `comment` on the `House` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `address` on the `Territory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `fName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `lName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_territoryID_fkey";

-- AlterTable
ALTER TABLE "Congregation" ALTER COLUMN "congregationName" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "House" DROP CONSTRAINT "House_pkey",
ALTER COLUMN "territoryID" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "StreetAd" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "comment" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "House_pkey" PRIMARY KEY ("StreetAd");

-- AlterTable
ALTER TABLE "Territory" ALTER COLUMN "address" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "fName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "lName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_territoryID_fkey" FOREIGN KEY ("territoryID") REFERENCES "Territory"("territoryID") ON DELETE RESTRICT ON UPDATE CASCADE;
