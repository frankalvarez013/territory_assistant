/*
  Warnings:

  - A unique constraint covering the columns `[location]` on the table `Territory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Territory_location_key" ON "Territory"("location");
