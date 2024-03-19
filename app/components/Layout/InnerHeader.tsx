import Image from "next/image";
import logo from "../../public/images/logo.png";
import { LogoutButton } from "@/app/components/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function InnerHeader() {
  const res = await getServerSession(authOptions);
  let check = undefined;
  if (res && res.user) {
    if (res.user.isAdmin) {
      check = "admin";
    } else {
      check = "user";
    }
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
        <a href={`dashboard/request`}>Requests</a>
        <a href={`dashboard/createUser`}>Create Users</a>
        <a href={`dashboard/createTerritory`}>Create Territories</a>

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
        <LogoutButton></LogoutButton>
      </nav>
    </header>
  );
}
