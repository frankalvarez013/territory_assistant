import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Card from "../General/card";
import { redirect } from "next/navigation";

export default function HomePage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("homepage.tsx - Entering Home...", session);
    if (status === "authenticated") {
      if (session?.user.isGeneralAdmin) {
        redirect(`/gAdmin/dashboard`);
      } else if (session?.user.isAdmin) {
        console.log("admin!");
        redirect(`/admin/dashboard`);
      } else {
        console.log("!admin");
        redirect("/user/dashboard");
      }
    } else if (status === "unauthenticated") {
    }
  }, [session, status]); // Only re-run the effect if `session` or `status` changes

  const handleSignIn = () => {
    window.location.href = "/signIn";
  };

  return (
    <div className="flex justify-evenly items-center text-2xl text-white text h-full bg-[url('./public/images/mountains.jpg')] bg-opacity-10 bg-cover pt-20">
      <div className="absolute inset-0 w-full h-full bg-slate-500 bg-opacity-70"></div>
      <div className="z-10 gap-y-3 flex flex-col">
        <h5 className="font-thin">Welcome to</h5>
        <h1 className="font-extrabold text-7xl w-96">Territory Assistant</h1>
        <h5 className="font-thin">
          Your ultimate tool for territory management
        </h5>
        <h3>Efficiently manage and update access to your territories</h3>
        <button
          className="bg-white rounded-3xl text-black p-1 text-lg w-28 hover:bg-black hover:text-white"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>

      <div className="z-10 basis-1/4 justify-center flex py-10">
        <Card />
      </div>
    </div>
  );
}
