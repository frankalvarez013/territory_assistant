-- CreateEnum
CREATE TYPE "Status" AS ENUM ('LLEGA', 'VISITO', 'NO_LLEGAR');

-- AlterTable
ALTER TABLE "House" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'LLEGA';
