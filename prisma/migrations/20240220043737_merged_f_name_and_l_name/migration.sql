/*
  Warnings:

  - You are about to drop the column `fName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lName` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "fName",
DROP COLUMN "lName",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;
