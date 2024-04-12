/*
  Warnings:

  - The primary key for the `Image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Territory` table. All the data in the column will be lost.
  - Added the required column `congregationID` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `territoryID` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Territory" DROP CONSTRAINT "Territory_imageId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP CONSTRAINT "Image_pkey",
DROP COLUMN "id",
ADD COLUMN     "congregationID" TEXT NOT NULL,
ADD COLUMN     "territoryID" INTEGER NOT NULL,
ADD CONSTRAINT "Image_pkey" PRIMARY KEY ("territoryID", "congregationID");

-- AlterTable
ALTER TABLE "Territory" DROP COLUMN "imageId";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_territoryID_congregationID_fkey" FOREIGN KEY ("territoryID", "congregationID") REFERENCES "Territory"("territoryID", "congregationID") ON DELETE CASCADE ON UPDATE CASCADE;
