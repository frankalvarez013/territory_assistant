/*
  Warnings:

  - A unique constraint covering the columns `[StreetAd]` on the table `House` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "House_StreetAd_key" ON "House"("StreetAd");
