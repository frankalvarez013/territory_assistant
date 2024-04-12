-- AlterTable
ALTER TABLE "Territory" ADD COLUMN     "imageId" TEXT;

-- AddForeignKey
ALTER TABLE "Territory" ADD CONSTRAINT "Territory_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
