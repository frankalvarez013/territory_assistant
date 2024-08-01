import { Territory, House, Observation, User, Congregation } from "@prisma/client";
import { SetStateAction } from "react";
import DeleteUserModal from "../[user]/dashboard/manageUsers/deleteUserModal";

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
  params: {
    territoryID: string;
    congID: string;
  };
};
type TerritoryCheckProps = {
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
  uniqueOption: User | { id: string; name: string };
  options: User[];
  territoryId: string;
  congregationId: string;
};

type TerritoryParams = {
  params: {
    territoryID: string;
    congID: string;
  };
};
type QRCodeModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  congregation: string;
  territory: string;
};

type PrivelegeCheck = {
  congID: string;
  userID: string;
};

type deleteUserModalProps = {
  user: User;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
type EditUserModalProps = DeleteUserModalProps & {
  congregations: Congregation[];
};

interface ApprovalProps {
  reqID: string;
  territoryID: string;
  houseID: string;
  congregationID: string;
  observation: string;
  comment: string;
}

type DashboardProps = {
  params: {
    user: string;
  };
};
interface ExtendedTerritory extends Territory {
  currentUser: User;
}
