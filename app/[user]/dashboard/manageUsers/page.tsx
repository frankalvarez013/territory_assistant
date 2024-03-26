"use client";
import DashboardLayout from "@/app/components/Layout/DashboardLayout";
import EditUsers from "./editUsers";
import AddUsers from "./addUsers";

export default function Page() {
  return (
    <DashboardLayout>
      <div className="h-full flex flex-row justify-around items-center flex-wrap">
        <div className="p-10 border-greye border-2 rounded-2xl">
          <div className="text-5xl">Create Users</div>
          <div className=" mt-5 font-light text-slate-500">
            Create Users to manage territories within your congregation.
          </div>
          <div className=" text-darkgrey mb-7 text-xl font-semibold">
            <AddUsers></AddUsers>
          </div>
        </div>
        <div className="p-10 border-greye border-2 rounded-2xl">
          <div className="text-5xl">View Users</div>
          <div className="mt-5 font-light text-slate-500">
            Edit or Delete Users from your Congregation
          </div>
          <div className=" text-darkgrey mb-7 text-xl font-semibold">
            <EditUsers></EditUsers>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
