import Image from "next/image"
import logo from './assets/images/logo.png'
export default function Header(){
    return (
        <header className=" bg-slate-100  h-20 flex justify-around items-center fixed w-full">
                <Image alt="NA" src={logo} width={50} height={50}></Image>
                <div className="hidden">
                    burger
                </div>
                <nav className="justify-evenly flex basis-1/2">
                    <a href="">About Us</a>
                    <a href="">Our Work</a>
                    <a href="">Get Involved</a>
                </nav>
                <a>Donate</a>
        </header>
    )
}