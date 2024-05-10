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
  territoryID: string;
  congregationID: string;
  userID: string;
  houseID: string;
}

//HouseRow.tsx Types Below
//-------------------------------------------------------
type MakeEditableFunction = (houseID: number) => void;

type HouseRowProps = {
  house: House;
  makeEditable: MakeEditableFunction;
  isEditable: boolean;
};

type EmptyState = {
  Direction: string;
  StreetAd: string;
  comment: string | undefined | null;
  observation: string | undefined | null;
  dateVisited: Date | undefined | null;
};
// Define the type for the function parameter and return type
