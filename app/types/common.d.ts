import { Territory, House, Observation, User } from "@prisma/client";

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
  houseID: string;
}
interface SelectAddObservationProps {
  uniqueOption: Observation;
  options: Observation[];
  houseID: string;
  setLocalState: React.Dispatch<React.SetStateAction<LocalState>>;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  localState: LocalState;
  isEditable: boolean;
}
interface SelectAdminObservationProps {
  uniqueOption: Observation | null | undefined;
  options: Observation[];
  territoryID: string;
  congregationID: string;
  houseID: string;
  houseID: string;
  localState: House;
  setLocalState: React.Dispatch<React.SetStateAction<House>>;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  localSave: boolean;
  isEditable: boolean;
}
//HouseRow.tsx Types Below
//-------------------------------------------------------
type MakeEditableFunction = (houseID: number) => void;
type BooleanFunction = (fact: boolean) => void;

type HouseRowProps = {
  house: House;
  makeEditable: MakeEditableFunction;
  isEditable: boolean;
};

type EmptyState = {
  Direction: string;
  StreetAd: string;
  comment: string | undefined | null;
  observation: Observation | undefined | null;
  dateVisited: Date | undefined | null;
};
// Define the type for the function parameter and return type

type AddHouseRowProps = {
  key: number;
  makeEditable: MakeEditableFunction;
  isEditable: boolean;
  territoryID: string;
  update: boolean;
  setUpdate: BooleanFunction;
};
type TerritoryEditAdmin = {
  territoryID: string;
  congID: string;
};

//Interact Types
//-------------------------------
interface LocalState {
  Direction: string;
  observation: Observation;
  StreetAd: string;
  comment: string;
  dateVisited: string;
}
type SelectComponentProps = {
  uniqueOption: User;
  options: User[];
  territoryId: string;
  congregationId: string;
};
