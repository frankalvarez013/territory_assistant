"use client";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { LogoutButton } from "@/app/components/auth";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/app/types/api";

export default function InnerHeader() {
  const { data: session, status } = useSession() as { data: CustomSession | null; status: string };

  let check = null;

  // console.log("Status and Session:", status, session);

  if (session?.user) {
    if (session.user.isAdmin) {
      check = "admin";
    } else if (session.user.isGeneralAdmin) {
      check = "gAdmin";
    } else {
      check = "user";
    }
  }

  // Early return for when there's no user role determined
  if (!check) {
    console.log("NOT INSIDE - No user role determined");
    return (
      <header className="bg-[rgb(65,105,225)] bg-opacity-95 h-16 flex justify-around items-center fixed w-full z-10 text-white"></header>
    );
  }

  // Conditional rendering based on the user's role
  return (
    <header className="bg-[rgb(65,105,225)] bg-opacity-95 h-16 flex justify-around items-center fixed w-full z-10 text-white">
      <a href={`/${check}/dashboard`} className="flex justify-center items-center gap-2">
        <Image alt="Territory Assistant Logo" src={logo} width={50} height={50} />
        <div className="w-20">Territory Assistant</div>
      </a>

      <div className="hidden">burger</div>

      {check === "gAdmin" && (
        <nav className="justify-end gap-10 flex basis-1/2">
          <LogoutButton />
        </nav>
      )}

      {check === "admin" && (
        <nav className="justify-end gap-10 flex basis-1/2">
          <a href={`/${check}/dashboard`}>Dashboard</a>
          <a href={`/${check}/dashboard/request`}>Requests</a>
          <a href={`/${check}/dashboard/manageUsers`}>Manage Users</a>
          <a href={`/${check}/dashboard/manageTerritories`}>Manage Territories</a>
          <a href={`/${check}/dashboard/contact`}>Contact</a>
          <LogoutButton />
        </nav>
      )}

      {check === "user" && (
        <nav className="justify-end gap-10 flex basis-1/2">
          <a href={`/${check}/dashboard`}>Dashboard</a>
          <a href={`/${check}/dashboard/manageTerritories`}>Manage Territories</a>
          <a href={`/${check}/dashboard/request`}>Manage Requests</a>
          <LogoutButton />
        </nav>
      )}
    </header>
  );
}
