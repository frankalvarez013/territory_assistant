/*
  Warnings:

  - A unique constraint covering the columns `[territoryID,congregationID]` on the table `Territory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_territoryID_fkey";

-- DropIndex
DROP INDEX "Territory_territoryID_key";

-- CreateIndex
CREATE UNIQUE INDEX "Territory_territoryID_congregationID_key" ON "Territory"("territoryID", "congregationID");

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_territoryID_congregationID_fkey" FOREIGN KEY ("territoryID", "congregationID") REFERENCES "Territory"("territoryID", "congregationID") ON DELETE RESTRICT ON UPDATE CASCADE;
