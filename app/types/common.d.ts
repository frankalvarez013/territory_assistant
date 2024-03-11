import { Territory, House, Observation } from "@prisma/client";

// Assuming `Territory` is imported from Prisma as shown

interface TerritoryWithHouses extends Territory {
  houses: House[];
}

interface TerritoryProps {
  territory: TerritoryWithHouses;
}

interface SelectObservationProps {
  uniqueOption: Observation;
  options: Observation[];
  territoryId: string;
  congregationId: string;
}
