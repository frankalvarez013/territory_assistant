/*
  Warnings:

  - A unique constraint covering the columns `[congregationName]` on the table `Congregation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Congregation_congregationName_key" ON "Congregation"("congregationName");
