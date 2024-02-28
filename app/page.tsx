import { getCsrfToken, signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./components/users";
import { LoginButton, LogoutButton } from "./components/auth";
import Card from "./components/card";
import { useState } from "react";
import Header from "./components/header";
import HomepageLayout from "./components/HomepageLayout";
export default async function homePage() {
  return (
    <HomepageLayout>
      <div className="flex justify-evenly items-center text-2xl text-white text h-full bg-[url('./assets/images/mountains.jpg')] bg-opacity-10 bg-cover pt-20">
        <div className="absolute inset-0 w-full h-full bg-slate-500 bg-opacity-70"></div>
        <div className="z-10 gap-y-3 flex flex-col">
          <h5 className="font-thin">Welcome to</h5>
          <h1 className=" font-extrabold text-7xl w-96">Territory Assistant</h1>
          <h5 className="font-thin">
            Your ultimate tool for territory management
          </h5>
          <h3>Efficiently manage and update access to your territories</h3>
          <button className=" bg-white rounded-3xl text-black p-1 text-lg w-28">
            Sign In
          </button>
        </div>

        <div className="z-10 basis-1/4 justify-center flex py-10">
          <Card></Card>
        </div>
      </div>
    </HomepageLayout>
  );
}
