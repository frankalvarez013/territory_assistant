import { Congregation, House, Territory, User } from "@prisma/client";

export type ErrorFormHandler<T> = {
  [P in keyof T]?: boolean; // boolean flags indicating if there's an error
} & { error?: string };

export type UserErrorFormHandler = ErrorFormHandler<User> & { user?: boolean };
export type HouseErrorFormHandler = ErrorFormHandler<House> & { house?: boolean };
export type TerritoryErrorFormHandler = ErrorFormHandler<Territory> & { territory?: boolean };
export type CongregationErrorFormHandler = ErrorFormHandler<Congregation> & {
  congregation?: boolean;
};

export type errorParts = {
  field: string | null;
  model: string | null;
} | null;

export type errorModal = {
  entity: {
    function: () => any;
    data: {
      action?: boolean;
      id?: string;
    };
    adminAction?: boolean;
    addUser?: boolean;
    email?: string;
    message: string;
  };
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setFormErrorHandler: Dispatch<SetStateAction<object>>;
};
