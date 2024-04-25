-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_territoryID_congregationID_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_territoryID_congregationID_fkey" FOREIGN KEY ("territoryID", "congregationID") REFERENCES "Territory"("territoryID", "congregationID") ON DELETE CASCADE ON UPDATE CASCADE;
