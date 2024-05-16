import { Prisma, PrismaClient } from "@prisma/client";

export type HouseCreateCustomArgs = {
  args: Prisma.HouseCreateArgs;
  query: (args: Prisma.HouseCreateArgs) => Promise<any>;
};

export type TerritoryCreateCustomArgs = {
  args: Prisma.TerritoryCreateArgs;
  query: (args: Prisma.TerritoryCreateArgs) => Promise<any>;
};

export type UserDeleteCustomArgs = {
  args: Prisma.UserDeleteArgs;
  query: (args: Prisma.UserDeleteArgs) => Promise<any>;
};

export type ExtendedPrismaClient = PrismaClient & {
  query: {
    territory: {
      create: (params: TerritoryCreateCustomArgs) => Promise<any>;
    };
    house: {
      create: (params: HouseCreateCustomArgs) => Promise<any>;
    };
    user: {
      delete: (params: UserDeleteCustomArgs) => Promise<any>;
    };
  };
};
