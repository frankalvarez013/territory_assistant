import Image from "next/image";
import logo from "../../public/images/logo.png";
export default function Header() {
  return (
    <header className=" bg-[rgb(65,105,225)] bg-opacity-95 h-16 flex justify-around items-center fixed w-full z-10 text-white">
      <a className=" flex justify-center items-center gap-2" href="/">
        <Image alt="NA" src={logo} width={50} height={50}></Image>
        <div className="w-20">Territory Assistant</div>
      </a>

      <div className="hidden">burger</div>
      <nav className="justify-evenly flex basis-1/2">
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
