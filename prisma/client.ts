import { PrismaClient, TerritoryComment, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  HouseCreateCustomArgs,
  TerritoryCreateCustomArgs,
  UserDeleteCustomArgs,
  ExtendedPrismaClient,
} from "@/app/types/prisma";
import { CustomSession } from "@/app/types/api";

const prismaClientSingleton = (): ExtendedPrismaClient => {
  const prisma = new PrismaClient();
  const extendedPrisma: Partial<ExtendedPrismaClient> = {
    query: {
      territory: {
        async create({ args, query }: TerritoryCreateCustomArgs) {
          const { congregationID } = args.data;

          let congregationTerritoryCounter = await prisma.territoryCounter.findUnique({
            where: { congregationID: congregationID },
          });

          if (congregationTerritoryCounter == null && congregationID) {
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
            await prisma.territoryCounter.update({
              where: { congregationID: congregationID },
              data: { nextTerritoryID: congregationTerritoryCounter.nextTerritoryID + 1 },
            });
          }

          return query(args);
        },
      },
      house: {
        async create({ args, query }: HouseCreateCustomArgs) {
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
        },
      },
      user: {
        async delete({ args, query }: UserDeleteCustomArgs) {
          const session = (await getServerSession(authOptions)) as CustomSession | null;

          if (!session || !session.user || !session.user.id) {
            throw new Error("User not authenticated or user ID missing in session.");
          }
          const id = args.where.id;

          if (id) {
            const territories = await prisma.territory.findMany({
              where: { currentUserID: id },
            });

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
        },
      },
    },
  };

  return extendedPrisma as ExtendedPrismaClient;
};

declare global {
  var prisma: ExtendedPrismaClient | undefined;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
