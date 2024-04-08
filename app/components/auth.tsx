"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button
      onClick={() => {
        signIn();
      }}
    >
      Sign In
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: "/", redirect: true });
      }}
    >
      Sign Out
    </button>
  );
};
