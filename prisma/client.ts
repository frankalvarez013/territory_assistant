import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      territory: {
        async create({ model, operation,args,query}) {
          const {congregationID} = args.data
          console.log(congregationID)
          //Fetch the nextTeritoryID for the given congregationID
          let congregationTerritoryCounter = await prisma.congregationTerritoryCounter.findUnique({
            where: {congregationID}
          })
          console.log(congregationTerritoryCounter)

          //if congregationTerritoryCounter is there use it, if not create it
          if (!congregationTerritoryCounter && congregationID && args.data.territoryID){
            congregationTerritoryCounter = await prisma.congregationTerritoryCounter.create({
              data: {
                congregationID: congregationID,
                nextTerritoryID: 1,
              }
            })
          }
          console.log(congregationTerritoryCounter)

          if(congregationTerritoryCounter?.nextTerritoryID){
            //Use the nextTerritoryID for the new Territory
            args.data.territoryID = congregationTerritoryCounter?.nextTerritoryID
            await prisma.congregationTerritoryCounter.update({
              where: {congregationID},
              data: {
                nextTerritoryID: congregationTerritoryCounter?.nextTerritoryID+1
              }
            })
          }
          console.log(congregationTerritoryCounter)
        }
      },
      house: {
        async create({ model, operation,args,query}) {
          const territoryID = args.data.territoryID
          //Fetch the nextTeritoryID for the given congregationID
            let houseCounter = await prisma.houseCounter.findUnique({
              where: {
                territoryID: territoryID
              }
            })
          //if congregationTerritoryCounter is there use it, if not create it
          if (!houseCounter && territoryID && args.data.territoryID){
            houseCounter = await prisma.houseCounter.create({
              data: {
                territoryID: territoryID,
                nextHouseID: 1,
              }
            })
          }
          if(houseCounter?.nextHouseID){
            //Use the nextTerritoryID for the new Territory
            args.data.territoryID = houseCounter?.territoryID
            await prisma.houseCounter.update({
              where: {territoryID:territoryID},
              data: {
                nextHouseID: houseCounter?.nextHouseID+1
              }
            })
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