import Image from "next/image";
import logo from "../public/images/logo.png";
import { LogoutButton } from "@/app/components/auth";
export default function InnerHeader() {
  return (
    <header className=" bg-[rgb(65,105,225)] bg-opacity-95 h-16 flex justify-around items-center fixed w-full z-10 text-white">
      <a href="./admin" className=" flex justify-center items-center gap-2">
        <Image alt="NA" src={logo} width={50} height={50}></Image>
        <div className="w-20">Territory Assistant</div>
      </a>

      <div className="hidden">burger</div>
      <nav className=" justify-end gap-10 flex basis-1/2">
        <a href="./admin">Dashboard</a>
        <LogoutButton></LogoutButton>
      </nav>
    </header>
  );
}
