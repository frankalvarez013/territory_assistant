/*
  Warnings:

  - The primary key for the `House` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "House" DROP CONSTRAINT "House_pkey",
ADD CONSTRAINT "House_pkey" PRIMARY KEY ("territoryID", "StreetAd");
