-- CreateEnum
CREATE TYPE "Observation" AS ENUM ('EMPTY', 'VISITED', 'DONTVISIT', 'DOG', 'NIGHT');

-- CreateTable
CREATE TABLE "Congregation" (
    "id" TEXT NOT NULL,
    "congregationName" TEXT NOT NULL,

    CONSTRAINT "Congregation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fName" TEXT NOT NULL,
    "lName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "congregationID" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id","isAdmin")
);

-- CreateTable
CREATE TABLE "Territory" (
    "territoryID" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "AssignedDate" TIMESTAMP(3) NOT NULL,
    "ExperiationDate" TIMESTAMP(3) NOT NULL,
    "congregationID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Territory_pkey" PRIMARY KEY ("territoryID","congregationID")
);

-- CreateTable
CREATE TABLE "House" (
    "territoryID" TEXT NOT NULL,
    "StreetAd" TEXT NOT NULL,
    "observation" "Observation" NOT NULL DEFAULT 'EMPTY',
    "comment" TEXT NOT NULL,
    "dateVisited" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("StreetAd")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Territory_territoryID_key" ON "Territory"("territoryID");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_congregationID_fkey" FOREIGN KEY ("congregationID") REFERENCES "Congregation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Territory" ADD CONSTRAINT "Territory_congregationID_fkey" FOREIGN KEY ("congregationID") REFERENCES "Congregation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Territory" ADD CONSTRAINT "Territory_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_territoryID_fkey" FOREIGN KEY ("territoryID") REFERENCES "Territory"("territoryID") ON DELETE RESTRICT ON UPDATE CASCADE;
