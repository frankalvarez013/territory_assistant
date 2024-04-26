-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Elder', 'MS', 'Approved');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Role" "Role" NOT NULL DEFAULT 'Approved';
