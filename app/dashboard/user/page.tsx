import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import TerritoryPreview from "../TerritoryPreview";
import DashboardLayout from "../../components/DashboardLayout";
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
    <DashboardLayout>
      <div className="h-full flex flex-col justify-center items-center">
        <div className=" w-10/12 h-5/6 flex flex-col">
          <div className="mt-10 ml-20">
            <div className="text-5xl">Welcome, {session.user.name}</div>
            <div className=" mt-5 font-light text-slate-500">
              These are your assigned territories from INSERT TIME FRAME -
              INSERT TIME FRAME
            </div>
          </div>
          <div className=" m-auto w-[90%] h-full mt-10 p-10 border-greye border-2 rounded-2xl">
            <div className=" text-darkgrey mb-7 text-xl font-semibold">
              Assigned Territories
            </div>
            <TerritoryPreview
              terrList={terrList}
              userID={session.user.id}
            ></TerritoryPreview>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
