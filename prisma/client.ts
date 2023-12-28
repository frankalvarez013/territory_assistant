import { PrismaClient } from '@prisma/client'
import type { HouseCounter } from '@prisma/client'
const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      territory: {
        async create({args,query}) {
          const {congregationID} = args.data
          //Fetch the nextTeritoryID for the given congregationID
          let congregationTerritoryCounter = await prisma.territoryCounter.findUnique({
            where: {
              congregationID:congregationID
            }
          })
          //if congregationTerritoryCounter is there use it, if not create it
          if (congregationTerritoryCounter==null && congregationID){
            congregationTerritoryCounter = await prisma.territoryCounter.create({
              data: {
                congregationID: congregationID,
                nextTerritoryID: 1,
              }
            })
          }
          console.log(congregationTerritoryCounter?.nextTerritoryID)
          if(typeof(congregationTerritoryCounter?.nextTerritoryID) === typeof(1) && congregationTerritoryCounter!=null){
            //Use the nextTerritoryID for the new Territory
            args.data.territoryID = congregationTerritoryCounter.nextTerritoryID
            const bobo = await prisma.territoryCounter.update({
              where: {
                congregationID:congregationID
              },
              data: {
                nextTerritoryID: congregationTerritoryCounter?.nextTerritoryID+1
              }
            })
          }
          return query(args);
        }
      },
      house: {
        async create({ args,query}) {
          console.log("HELLO")
          const {territoryID} = args.data
          const {congregationID} = args.data
          let houseCounter: HouseCounter | null
          if(territoryID && congregationID){
            console.log("Find Counter...")
            //Fetch the nextTeritoryID for the given congregationID
            houseCounter = await prisma.houseCounter.findUnique({
              where: {
                territoryID_congregationID:{
                  territoryID: territoryID,
                  congregationID: congregationID
              }
              }
            })
            //if congregationTerritoryCounter is there use it, if not create it
            console.log("WentThru...")
            console.log("Check if HouseCounter is there: ",houseCounter)
            if (houseCounter === null){
              console.log("Create Counter")
              houseCounter = await prisma.houseCounter.create({
                data: {
                  territoryID: territoryID,
                  congregationID: congregationID,
                  nextHouseID: 1,
                }
              })
            }
            console.log("WentThru...")
            if(houseCounter?.nextHouseID){
              console.log("Update New Val")
              //Use the nextTerritoryID for the new Territory
              console.log("Inserted Val",houseCounter.nextHouseID)
              args.data.houseID = houseCounter?.nextHouseID
              await prisma.houseCounter.update({
                where: {
                  territoryID_congregationID:{
                    territoryID: territoryID,
                    congregationID: congregationID
                  }
                },
                data: {
                  nextHouseID: houseCounter?.nextHouseID+1
                }
              })
            }
            console.log("End...")
            return query(args);
            }
        }
      }
    }
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma