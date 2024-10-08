"use client";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { LogoutButton } from "@/app/components/auth";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/app/types/api";
import Nav from "../General/navbar";
export default function InnerHeader() {
  const { data: session, status } = useSession() as { data: CustomSession | null; status: string };

  let check = null;

  // console.log("Status and Session:", status, session);
  // console.log(session.user);
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
    return (
      <header className="bg-[rgb(65,105,225)] h-16 flex justify-around items-center fixed w-full z-10 text-white"></header>
    );
  }

  // Conditional rendering based on the user's role
  return (
    <header className="bg-[rgb(65,105,225)] h-16 flex md:justify-around pl-5 md:pl-10 md:px-0 items-center justify-between fixed w-full z-10 text-white">
      <a href={`/${check}/dashboard`} className="flex justify-center items-center gap-2">
        <Image alt="Territory Assistant Logo" src={logo} width={50} height={50} />
        <div className="w-20">Territory Assistant</div>
      </a>
      {check === "gAdmin" && (
        <>
          <nav className="justify-end gap-10 basis-1/2 hidden md:flex">
            <LogoutButton />
          </nav>
          <div className="md:hidden">
            <Nav>
              <LogoutButton />
            </Nav>
          </div>
        </>
      )}
      {check === "admin" && (
        <>
          <nav className="justify-end gap-10  hidden md:flex basis-1/2">
            <a href={`/${check}/dashboard`}>Dashboard</a>
            <a href={`/${check}/dashboard/request`}>Requests</a>
            <a href={`/${check}/dashboard/manageUsers`}>Manage Users</a>
            <a href={`/${check}/dashboard/manageTerritories`}>Manage Territories</a>
            <a href={`/${check}/dashboard/contact`}>Contact</a>
            <LogoutButton />
          </nav>
          <div className="md:hidden">
            <Nav>
              <a href={`/${check}/dashboard`}>Dashboard</a>
              <a href={`/${check}/dashboard/request`}>Requests</a>
              <a href={`/${check}/dashboard/manageUsers`}>Manage Users</a>
              <a href={`/${check}/dashboard/manageTerritories`}>Manage Territories</a>
              <a href={`/${check}/dashboard/contact`}>Contact</a>
              <LogoutButton />
            </Nav>
          </div>
        </>
      )}

      {check === "user" && (
        <>
          <nav className="justify-end gap-10  hidden md:flex basis-1/2">
            <a href={`/${check}/dashboard`}>Dashboard</a>
            <a href={`/${check}/dashboard/manageTerritories`}>Manage Territories</a>
            <a href={`/${check}/dashboard/request`}>Manage Requests</a>
            <LogoutButton />
          </nav>
          <div className="md:hidden">
            <Nav>
              <a href={`/${check}/dashboard`}>Dashboard</a>
              <a href={`/${check}/dashboard/manageTerritories`}>Manage Territories</a>
              <a href={`/${check}/dashboard/request`}>Manage Requests</a>
              <LogoutButton />
            </Nav>
          </div>
        </>
      )}
    </header>
  );
}
