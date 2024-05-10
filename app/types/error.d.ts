import { House, User } from "@prisma/client";

export type ErrorFormHandler<T> = {
  [P in keyof T]?: boolean; // boolean flags indicating if there's an error
} & { error?: string };

export type OptionalUser = Partial<User>;

export type OptionalHouse = Partial<House>;
