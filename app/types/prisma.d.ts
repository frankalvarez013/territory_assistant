import { PrismaClient, Prisma } from "@prisma/client";

// Define an interface for the arguments your custom methods expect
interface CustomQueryArgs {
  args: {
    data: Prisma.TerritoryCreateArgs["data"] & { congregationID: string };
    where?: Prisma.TerritoryWhereUniqueInput;
  };
  query: (args: any) => Promise<any>; // Define a more specific type based on your actual usage
}

// Interface to extend Prisma with custom methods
interface ExtendedPrismaClient extends PrismaClient {
  query: {
    territory: {
      create: (params: CustomQueryArgs) => Promise<any>; // Define return type more specifically
    };
    house: {
      create: (params: CustomQueryArgs) => Promise<any>;
    };
    user: {
      delete: (params: CustomQueryArgs) => Promise<any>;
    };
  };
}
