import { PrismaClient } from "@prisma/client";
import type { HouseCounter } from "@prisma/client";
const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      territory: {
        async create({ args, query }) {
          const { congregationID } = args.data;
          //Fetch the nextTeritoryID for the given congregationID
          let congregationTerritoryCounter =
            await prisma.territoryCounter.findUnique({
              where: {
                congregationID: congregationID,
              },
            });
          //if congregationTerritoryCounter is there use it, if not create it
          if (congregationTerritoryCounter == null && congregationID) {
            congregationTerritoryCounter = await prisma.territoryCounter.create(
              {
                data: {
                  congregationID: congregationID,
                  nextTerritoryID: 1,
                },
              }
            );
          }
          console.log(congregationTerritoryCounter?.nextTerritoryID);
          if (
            typeof congregationTerritoryCounter?.nextTerritoryID === typeof 1 &&
            congregationTerritoryCounter != null
          ) {
            //Use the nextTerritoryID for the new Territory
            args.data.territoryID =
              congregationTerritoryCounter.nextTerritoryID;
            const bobo = await prisma.territoryCounter.update({
              where: {
                congregationID: congregationID,
              },
              data: {
                nextTerritoryID:
                  congregationTerritoryCounter?.nextTerritoryID + 1,
              },
            });
          }
          return query(args);
        },
      },
      house: {
        async create({ args, query }) {
          console.log("HELLO");
          const { territoryID, congregationID } = args.data;

          if (territoryID && congregationID) {
            console.log("Find Counter...");

            // Start a transaction to ensure all operations are successful
            const result = await prisma.$transaction(async (prisma) => {
              let houseCounter = await prisma.houseCounter.findUnique({
                where: {
                  territoryID_congregationID: {
                    territoryID: territoryID,
                    congregationID: congregationID,
                  },
                },
              });

              console.log("Check if HouseCounter is there: ", houseCounter);
              if (houseCounter === null) {
                console.log("Create Counter");
                houseCounter = await prisma.houseCounter.create({
                  data: {
                    territoryID: territoryID,
                    congregationID: congregationID,
                    nextHouseID: 1,
                  },
                });
              }

              if (houseCounter && houseCounter.nextHouseID) {
                console.log("Update New Val");
                args.data.houseID = houseCounter.nextHouseID;

                // Update the counter only if the nextHouseID is available
                await prisma.houseCounter.update({
                  where: {
                    territoryID_congregationID: {
                      territoryID: territoryID,
                      congregationID: congregationID,
                    },
                  },
                  data: {
                    nextHouseID: houseCounter.nextHouseID + 1,
                  },
                });
              }

              // Proceed with the main creation query only if all previous operations are successful
              return query(args);
            });

            console.log("Transaction successful");
            return result;
          } else {
            // Handle the case where territoryID or congregationID is not provided
            console.log("TerritoryID or CongregationID is missing");
            throw new Error("TerritoryID and CongregationID are required.");
          }
        },
      },
    },
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
