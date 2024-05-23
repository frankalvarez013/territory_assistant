-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_congregationID_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_congregationID_fkey" FOREIGN KEY ("congregationID") REFERENCES "Congregation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
