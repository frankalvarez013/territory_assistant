"use client";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { LogoutButton } from "@/app/components/auth";
import { useSession } from "next-auth/react";
export default function InnerHeader() {
  const { data: session, status } = useSession();
  console.log(session);
  let check = null;
  if (session && session.user) {
    if (session.user.isAdmin) {
      check = "admin";
    } else {
      check = "user";
    }
  }
  if (!check) {
    return (
      <header className=" bg-[rgb(65,105,225)] bg-opacity-95 h-16 flex justify-around items-center fixed w-full z-10 text-white"></header>
    );
  }
  return check === "admin" ? (
    <header className=" bg-[rgb(65,105,225)] bg-opacity-95 h-16 flex justify-around items-center fixed w-full z-10 text-white">
      <a
        href={`/${check}/dashboard`}
        className=" flex justify-center items-center gap-2"
      >
        <Image alt="NA" src={logo} width={50} height={50}></Image>
        <div className="w-20">Territory Assistant</div>
      </a>

      <div className="hidden">burger</div>
      <nav className=" justify-end gap-10 flex basis-1/2">
        <a href={`/${check}/dashboard`}>Dashboard</a>
        <a href={`/${check}/dashboard/request`}>Requests</a>
        <a href={`/${check}/dashboard/manageUsers`}>Manage Users</a>
        <a href={`/${check}/dashboard/manageTerritories`}>Manage Territories</a>

        <LogoutButton></LogoutButton>
      </nav>
    </header>
  ) : (
    <header className=" bg-[rgb(65,105,225)] bg-opacity-95 h-16 flex justify-around items-center fixed w-full z-10 text-white">
      <a
        href={`/${check}/dashboard`}
        className=" flex justify-center items-center gap-2"
      >
        <Image alt="NA" src={logo} width={50} height={50}></Image>
        <div className="w-20">Territory Assistant</div>
      </a>

      <div className="hidden">burger</div>
      <nav className=" justify-end gap-10 flex basis-1/2">
        <a href={`/${check}/dashboard`}>Dashboard</a>
        <a href={`/${check}/dashboard/manageTerritories`}>Manage Territories</a>
        <a href={`/${check}/dashboard/request`}>Manage Requests</a>
        <LogoutButton></LogoutButton>
      </nav>
    </header>
  );
}
