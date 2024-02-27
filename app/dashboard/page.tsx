import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { User } from "../users";
import TerritoryPreview from "./TerritoryPreview";
export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const terrList = [
    {
      id: "1",
      lastDate: "03-01-2024",
      address: "Walnut Street",
      initial: "02-26-2024",
      expiration: "03-24-2024",
    },
    {
      id: "2",
      lastDate: "03-01-2024",
      address: "Walnut Street",
      initial: "02-26-2024",
      expiration: "03-24-2024",
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="text-5xl ">Hi {session.user.name}</div>
      <div>
        These are your assigned territories from INSERT TIME FRAME - INSERT TIME
        FRAME
      </div>
      <div className=" m-auto w-[90%] h-1/2 p-10 border-greye border-2 rounded-2xl">
        <div className=" text-darkgrey mb-7 text-xl font-semibold">
          Assigned Territories
        </div>
        <TerritoryPreview terrList={terrList}></TerritoryPreview>
      </div>
      {/* <LoginButton></LoginButton>
            <LogoutButton></LogoutButton> */}
    </div>
  );
}
