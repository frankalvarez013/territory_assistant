import DashboardLayout from "@/app/components/Layout/DashboardLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import EditTerritories from "./editTerritories";
import AddTerritories from "./AddTerritories";
import QuestionCard from "../../../components/General/QuestionCard";
import { CustomSession } from "@/app/types/api";
export default async function Page() {
  const session = (await getServerSession(authOptions)) as CustomSession | null;
  // console.log(session);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <DashboardLayout>
      <div className="h-full flex flex-col justify-center items-center">
        <div className=" h-5/6 flex flex-row justify-around items-center flex-wrap">
          {session?.user?.isAdmin ? (
            <div className="  w-[45%] min-w-[420px] h-full mt-10 p-10 border-greye border-2 rounded-2xl">
              <div className="text-5xl">Create Territories</div>
              <div className="mt-10">
                <QuestionCard Question="Create Territory Via Excel Sheet"></QuestionCard>
              </div>
              <div className=" mt-5 font-light text-slate-500">
                Create Territories to populate your congregation.
              </div>
              <div className=" text-darkgrey mb-7 text-xl font-semibold mt-2">
                <AddTerritories></AddTerritories>
              </div>
            </div>
          ) : null}

          <div className=" w-[45%] min-w-[420px] h-full mt-10 p-10 border-greye border-2 rounded-2xl">
            <div className="text-5xl">View Territories</div>
            <div className=" mt-5 font-light text-slate-500">
              Click on one of the territories to edit it
            </div>
            <div className=" text-darkgrey mb-7 text-xl font-semibold flex gap-5 flex-col mt-5">
              <EditTerritories
                congID={session?.user?.congID!}
                userID={session?.user?.id!}
              ></EditTerritories>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
