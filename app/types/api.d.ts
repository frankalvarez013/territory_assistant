import { ServerSessionOptions } from "http2";
import { getServerSession, Session } from "next-auth";
import { User } from "next-auth";
export type ErrorResponse = {
  message: string;
};

export type territoryJSON = {
  territoryID: string;
  location: string;
  AssignedDate: string | null;
  ExperiationDate: string | null;
  congregationID: string;
  currentUserID: string | null;
};

interface CustomUser extends User {
  id?: string;
  isAdmin?: boolean;
  congID?: string;
  isGeneralAdmin?: boolean;
}

interface CustomSession extends Session {
  user?: CustomUser;
}
