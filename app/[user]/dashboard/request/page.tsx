import DashboardLayout from "@/app/components/Layout/DashboardLayout";
import TerritoryPreview from "../TerritoryPreview";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import RequestView from "./RequestView";
export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col justify-center items-center">
        <div className=" w-10/12 h-5/6 flex flex-col">
          <div className="mt-10 ml-20">
            <div className="text-5xl">Welcome, {session.user.name}</div>
            <div className=" mt-5 font-light text-slate-500">
              Accept Or Deny Requests sent to Territories that belong to you.
            </div>
          </div>
          <div className=" m-auto w-[90%] h-full mt-10 p-10 border-greye border-2 rounded-2xl">
            <div className=" text-darkgrey mb-7 text-xl font-semibold">
              Requests
            </div>
            <RequestView
              userID={session.user.id}
              congID={session.user.congID}
            ></RequestView>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
