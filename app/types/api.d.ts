export type ErrorResponse = {
    message: string;
}

export type territoryJSON = {
    territoryID: number;
    location: string;
    AssignedDate: string | null;
    ExperiationDate: string | null;
    congregationID: string;
    currentUserID: string | null;
}