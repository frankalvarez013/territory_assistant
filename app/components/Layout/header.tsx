import Image from "next/image";
import logo from "../../public/images/logo.png";
export default function Header() {
  return (
    <header className=" bg-[rgb(65,105,225)] bg-opacity-95 h-16 flex justify-around items-center fixed w-full z-10 text-white">
      <div className=" flex justify-center items-center gap-2">
        <Image alt="NA" src={logo} width={50} height={50}></Image>
        <div className="w-20">Territory Assistant</div>
      </div>

      <div className="hidden">burger</div>
      <nav className="justify-evenly flex basis-1/2">
        <a href="">Home Page</a>
        <a href="">About Us</a>
        <a href="">Contact</a>
        <a href="">Login</a>
      </nav>
    </header>
  );
}
