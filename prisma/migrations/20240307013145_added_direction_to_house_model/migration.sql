/*
  Warnings:

  - Added the required column `Direction` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "House" ADD COLUMN     "Direction" TEXT NOT NULL;
