"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  console.log("OI");
  return <SessionProvider>{children}</SessionProvider>;
};
