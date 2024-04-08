import DashboardLayout from "@/app/components/Layout/DashboardLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import EditTerritories from "./editTerritories";
import AddTerritories from "./AddTerritories";
import fetchAddTerritory from "@/app/components/fetch/fetchAddTerritory";
export default async function Page() {
  const session = await getServerSession(authOptions);
  // console.log(session);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <DashboardLayout check={session.user.isAdmin}>
      <div className="h-full flex flex-col justify-center items-center">
        <div className=" h-5/6 flex gap-80">
          <div className=" m-auto w-[90%] h-full mt-10 p-10 border-greye border-2 rounded-2xl">
            <div className="text-5xl">Create Territories</div>
            <div className=" mt-5 font-light text-slate-500">
              Create Territories to populate your congregation.
            </div>
            <div className=" text-darkgrey mb-7 text-xl font-semibold mt-2">
              <AddTerritories></AddTerritories>
            </div>
          </div>
          <div className=" m-auto w-[90%] h-full mt-10 p-10 border-greye border-2 rounded-2xl">
            <div className="text-5xl">View Territories</div>
            <div className=" mt-5 font-light text-slate-500">
              Click on one of the territories to edit it
            </div>
            <div className=" text-darkgrey mb-7 text-xl font-semibold">
              <EditTerritories
                congID={session.user.congID}
                userID={session.user.id}
              ></EditTerritories>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
