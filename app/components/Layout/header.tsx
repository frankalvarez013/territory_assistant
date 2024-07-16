"use client";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { MenuIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/outline";
import { useState } from "react";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("checking header");
  return (
    <header className="bg-[rgb(65,105,225)] h-16 flex justify-around items-center fixed w-full z-50 text-white">
      <a className="relative flex justify-center items-center gap-2" href="/">
        <Image alt="NA" src={logo} width={50} height={50}></Image>
        <div className="w-20">Territory Assistant</div>
      </a>
      <div className=" w-10"></div>
      <div className="z-50 visible sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (
          <>
            <XIcon className="h-6 w-6" aria-hidden="true" />

            <nav className="z-50 absolute bg-[rgb(65,105,225)] right-0 pt-4 h-40 bg-opacity-95 justify-evenly flex flex-col basis-1/2 px-3">
              <a href="/" className=" hover:text-black">
                Home Page
              </a>
              <a href="/aboutus" className="z-50 hover:text-black">
                About Us
              </a>
              <a href="/contact" className="z-50 hover:text-black">
                Contact
              </a>
              <a href="/signIn" className="z-50hover:text-black">
                Login
              </a>
            </nav>
          </>
        ) : (
          <MenuIcon className="h-6 w-6" onClick={() => setMenuOpen(!menuOpen)} />
        )}
      </div>
      <nav className="hidden sm:visible justify-evenly sm:flex basis-1/2">
        <a href="/" className=" hover:text-black">
          Home Page
        </a>
        <a href="/aboutus" className=" hover:text-black">
          About Us
        </a>
        <a href="/contact" className=" hover:text-black">
          Contact
        </a>
        <a href="/signIn" className=" hover:text-black">
          Login
        </a>
      </nav>
    </header>
  );
}
