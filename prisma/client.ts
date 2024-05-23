import { PrismaClient, TerritoryComment } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  HouseCreateCustomArgs,
  TerritoryCreateCustomArgs,
  UserDeleteCustomArgs,
  ExtendedPrismaClient,
} from "@/app/types/prisma";
import { CustomSession } from "@/app/types/api";

// Adding a global variable to count initializations
if (typeof globalThis.prismaInitializationCount === "undefined") {
  globalThis.prismaInitializationCount = 0;
}

const prismaClientSingleton = (): ExtendedPrismaClient => {
  if (!globalThis.prisma) {
    console.log("Creating a new Prisma Client instance.");
    globalThis.prismaInitializationCount += 1;

    const prisma = new PrismaClient() as ExtendedPrismaClient;

    // Adding custom methods to the existing Prisma client
    prisma.query = {
      territory: {
        async create({ args, query }: TerritoryCreateCustomArgs) {
          console.log("Prisma territory.create method called");
          try {
            console.log("Arguments:", args);
            const { congregationID } = args.data;

            let congregationTerritoryCounter = await prisma.territoryCounter.findUnique({
              where: { congregationID: congregationID },
            });

            if (congregationTerritoryCounter == null && congregationID) {
              console.log("Creating new territory counter");
              congregationTerritoryCounter = await prisma.territoryCounter.create({
                data: {
                  congregationID: congregationID,
                  nextTerritoryID: 1,
                },
              });
            }

            if (
              typeof congregationTerritoryCounter?.nextTerritoryID === "number" &&
              congregationTerritoryCounter != null
            ) {
              args.data.territoryID = congregationTerritoryCounter.nextTerritoryID;
              console.log(
                "Updating territory counter to:",
                congregationTerritoryCounter.nextTerritoryID + 1
              );
              await prisma.territoryCounter.update({
                where: { congregationID: congregationID },
                data: { nextTerritoryID: congregationTerritoryCounter.nextTerritoryID + 1 },
              });
            }

            return query(args);
          } catch (error) {
            console.error("Error in territory.create:", error);
            throw error;
          }
        },
      },
      house: {
        async create({ args, query }: HouseCreateCustomArgs) {
          console.log("Prisma house.create method called");
          try {
            console.log("Arguments:", args);
            const { territoryID, congregationID } = args.data;

            if (territoryID && congregationID) {
              const result = await prisma.$transaction(async (prisma) => {
                let houseCounter = await prisma.houseCounter.findUnique({
                  where: {
                    territoryID_congregationID: {
                      territoryID: territoryID,
                      congregationID: congregationID,
                    },
                  },
                });

                if (houseCounter === null) {
                  console.log("Creating new house counter");
                  houseCounter = await prisma.houseCounter.create({
                    data: {
                      territoryID: territoryID,
                      congregationID: congregationID,
                      nextHouseID: 1,
                    },
                  });
                }

                if (houseCounter && houseCounter.nextHouseID) {
                  args.data.houseID = houseCounter.nextHouseID;
                  console.log("Updating house counter to:", houseCounter.nextHouseID + 1);

                  await prisma.houseCounter.update({
                    where: {
                      territoryID_congregationID: {
                        territoryID: territoryID,
                        congregationID: congregationID,
                      },
                    },
                    data: { nextHouseID: houseCounter.nextHouseID + 1 },
                  });
                }

                return query(args);
              });

              return result;
            } else {
              throw new Error("TerritoryID and CongregationID are required.");
            }
          } catch (error) {
            console.error("Error in house.create:", error);
            throw error;
          }
        },
      },
      user: {
        async delete({ args, query }: UserDeleteCustomArgs) {
          console.log("Prisma user.delete method called");
          try {
            const session = (await getServerSession(authOptions)) as CustomSession | null;
            console.log("Session:", session);

            if (!session || !session.user || !session.user.id) {
              throw new Error("User not authenticated or user ID missing in session.");
            }
            const id = args.where.id;

            if (id) {
              console.log(`Deleting user with ID: ${id}`);
              const territories = await prisma.territory.findMany({
                where: { currentUserID: id },
              });
              console.log("Territories to update:", territories);

              const result = await Promise.all(
                territories.map((territory) =>
                  prisma.territory.update({
                    where: {
                      territoryID_congregationID: {
                        territoryID: territory.territoryID,
                        congregationID: territory.congregationID,
                      },
                    },
                    data: {
                      activity: TerritoryComment.Available,
                      currentUserID: session?.user?.id,
                    },
                  })
                )
              );

              return query(args);
            } else {
              throw new Error("User ID is required.");
            }
          } catch (error) {
            console.error("Error in user.delete:", error);
            throw error;
          }
        },
      },
    };

    globalThis.prisma = prisma;
  } else {
    console.log("Reusing existing Prisma Client instance.");
  }

  return globalThis.prisma;
};

const prisma = prismaClientSingleton();

console.log(`Prisma client initialization count: ${globalThis.prismaInitializationCount}`);

export default prisma;
