import DashboardLayout from "@/app/components/Layout/DashboardLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import EditTerritories from "./editTerritories";
import RequestView from "../request/RequestView";
import { StateProvider } from "../request/StateContext";
export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col justify-center items-center">
        <div className=" h-5/6 flex gap-80">
          <div className=" m-auto w-[90%] h-full mt-10 p-10 border-greye border-2 rounded-2xl">
            <div className="text-5xl">Create Territories</div>
            <div className=" mt-5 font-light text-slate-500">
              Create Territories to populate your congregation.
            </div>
            <div className=" text-darkgrey mb-7 text-xl font-semibold">
              <div>
                <form action="/submit-form-endpoint" method="POST">
                  <div>
                    <label htmlFor="name">Name:</label>
                    <input
                      className="block border-2 border-black"
                      type="text"
                      id="name"
                      name="name"
                      required
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="email">Email:</label>
                    <input
                      className="block border-2 border-black"
                      type="email"
                      id="email"
                      name="email"
                      required
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="password">Password:</label>
                    <input
                      className="block border-2 border-black"
                      type="password"
                      id="password"
                      name="password"
                      required
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="congregationID">Congregation ID:</label>
                    <input
                      className="block border-2 border-black"
                      type="text"
                      id="congregationID"
                      name="congregationID"
                      required
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="isAdmin">Is Admin:</label>
                    <input type="checkbox" id="isAdmin" name="isAdmin"></input>
                  </div>
                  <button
                    className="border-2 border-black rounded-3xl px-3"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className=" m-auto w-[90%] h-full mt-10 p-10 border-greye border-2 rounded-2xl">
            <div className="text-5xl">View Territories</div>
            <div className=" mt-5 font-light text-slate-500">
              Click on one of the territories to edit it
            </div>
            <div className=" text-darkgrey mb-7 text-xl font-semibold">
              <EditTerritories></EditTerritories>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
