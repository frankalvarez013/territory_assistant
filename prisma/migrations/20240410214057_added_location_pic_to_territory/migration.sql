-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_congregationID_fkey";

-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_territoryID_congregationID_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_houseID_territoryID_congregationID_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_territoryID_congregationID_fkey";

-- DropForeignKey
ALTER TABLE "Territory" DROP CONSTRAINT "Territory_congregationID_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_congregationID_fkey";

-- AlterTable
ALTER TABLE "Territory" ADD COLUMN     "locationPic" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_congregationID_fkey" FOREIGN KEY ("congregationID") REFERENCES "Congregation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Territory" ADD CONSTRAINT "Territory_congregationID_fkey" FOREIGN KEY ("congregationID") REFERENCES "Congregation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_territoryID_congregationID_fkey" FOREIGN KEY ("territoryID", "congregationID") REFERENCES "Territory"("territoryID", "congregationID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_houseID_territoryID_congregationID_fkey" FOREIGN KEY ("houseID", "territoryID", "congregationID") REFERENCES "House"("houseID", "territoryID", "congregationID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_territoryID_congregationID_fkey" FOREIGN KEY ("territoryID", "congregationID") REFERENCES "Territory"("territoryID", "congregationID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_congregationID_fkey" FOREIGN KEY ("congregationID") REFERENCES "Congregation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
