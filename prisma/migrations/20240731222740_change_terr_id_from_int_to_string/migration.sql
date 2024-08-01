/*
  Warnings:

  - The primary key for the `House` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Territory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_territoryID_congregationID_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_territoryID_congregationID_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_houseID_territoryID_congregationID_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_territoryID_congregationID_fkey";

-- AlterTable
ALTER TABLE "House" DROP CONSTRAINT "House_pkey",
ALTER COLUMN "territoryID" SET DATA TYPE TEXT,
ADD CONSTRAINT "House_pkey" PRIMARY KEY ("territoryID", "houseID", "congregationID");

-- AlterTable
ALTER TABLE "Image" DROP CONSTRAINT "Image_pkey",
ALTER COLUMN "territoryID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Image_pkey" PRIMARY KEY ("territoryID", "congregationID");

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "territoryID" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Territory" DROP CONSTRAINT "Territory_pkey",
ALTER COLUMN "territoryID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Territory_pkey" PRIMARY KEY ("territoryID", "congregationID");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_territoryID_congregationID_fkey" FOREIGN KEY ("territoryID", "congregationID") REFERENCES "Territory"("territoryID", "congregationID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_territoryID_congregationID_fkey" FOREIGN KEY ("territoryID", "congregationID") REFERENCES "Territory"("territoryID", "congregationID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_houseID_territoryID_congregationID_fkey" FOREIGN KEY ("houseID", "territoryID", "congregationID") REFERENCES "House"("houseID", "territoryID", "congregationID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_territoryID_congregationID_fkey" FOREIGN KEY ("territoryID", "congregationID") REFERENCES "Territory"("territoryID", "congregationID") ON DELETE CASCADE ON UPDATE CASCADE;
