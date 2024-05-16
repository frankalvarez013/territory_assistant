import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import TerritoryTransfer from "./TerritoryTransfer";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import TerritoryPreview from "../../[user]/dashboard/TerritoryPreview";
import EditCongregation from "./EditCongregation";
import AddCongregation from "./AddCongregation";
import { CustomSession } from "@/app/types/api";
import { DashboardProps } from "@/app/types/common";
export default async function Dashboard({ params }: { params: { user: string } }) {
  const session = (await getServerSession(authOptions)) as CustomSession;
  if (!session) {
    redirect("/api/auth/signin");
  }
  if (params.user === "user") {
    return (
      <DashboardLayout>
        <div className="h-full flex flex-col justify-center items-center">
          <div className=" w-10/12 h-5/6 flex flex-col">
            <div className="mt-10 ml-20">
              <div className="text-5xl">Welcome, {session!.user!.name!}</div>
              <div className=" mt-5 font-light text-slate-500">
                These are your assigned territories from INSERT TIME FRAME - INSERT TIME FRAME
              </div>
            </div>
            <div className=" m-auto w-[90%] h-full mt-10 p-10 border-greye border-2 rounded-2xl">
              <div className=" text-darkgrey mb-7 text-xl font-semibold">Assigned Territories</div>
              <TerritoryPreview userID={session!.user!.id!}></TerritoryPreview>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  } else if (params.user === "admin") {
    return (
      <DashboardLayout>
        <div className="h-full flex flex-col justify-center items-center">
          <div className="w-10/12 h-5/6 flex flex-col">
            <div className="mt-10">
              <div className="text-5xl mb-10">Welcome, {session!.user!.name}</div>

              <div className="pl-10 pr-5 py-8 justify-center flex flex-col rounded-[2rem] shadow-all-angles">
                <div className=" font-light text-slate-500 mb-3">
                  Welcome admin, this dashboard provides a view of all members who receive territory
                  card assignments.
                </div>
                <ol className="list-decimal ml-5">
                  <li>
                    User the dropdown list under Publisher to assign territory cards then update
                    assigned date, the expiration date will auto calculate.
                  </li>
                  <li>
                    Each territory row will auto fill with the color yellow for assigned not expired
                    territory cards.
                  </li>
                  <li>Light red for expired territory cards.</li>
                  <li>Each territory assignment expires 120 days from the assigned date.</li>
                  <li>
                    Once a territory expires, the comment column updates with an `Expired comment
                    and the row highlights in light red.`
                  </li>
                  <li>
                    Available territories for reassignment will be filled wtih light green color.
                    The publisher field is updated with to Available.
                  </li>
                </ol>
              </div>
            </div>
            <div className="mt-10 pt-2 px-2 md:p-10 sm:p-0 border-greye border-2 rounded-2xl">
              <div className="text-darkgrey mb-7 text-xl font-semibold">Assigned Territories</div>
              <div className="min-w-full">
                <TerritoryTransfer />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  } else if (params.user === "gAdmin") {
    return (
      <DashboardLayout>
        <div className="h-full flex flex-col justify-center items-center">
          <div className="w-10/12 h-5/6 flex flex-col">
            <div className="mt-10">
              <div className="text-5xl mb-10">Welcome, {session!.user!.name}</div>

              <div className="pl-10 py-8 justify-center flex flex-col rounded-[2rem] shadow-all-angles">
                <div className=" font-light text-slate-500 mb-3">
                  Welcome General Admin! this dashboard provides a view of all congregations
                </div>
                <ol className="list-decimal ml-5">
                  <li>
                    User the dropdown list under Publisher to assign territory cards then update
                    assigned date, the expiration date will auto calculate.
                  </li>
                  <li>
                    Each territory row will auto fill with the color yellow for assigned not expired
                    territory cards.
                  </li>
                  <li>Light red for expired territory cards.</li>
                  <li>Each territory assignment expires 120 days from the assigned date.</li>
                  <li>
                    Once a territory expires, the comment column updates with an `Expired comment
                    and the row highlights in light red.`
                  </li>
                  <li>
                    Available territories for reassignment will be filled wtih light green color.
                    The publisher field is updated with to Available.
                  </li>
                </ol>
              </div>
            </div>
            <div className="h-full mt-10 p-10 border-greye border-2 rounded-2xl">
              <div className=" text-darkgrey mb-7 text-xl font-semibold">
                All Congregations
                <div className="h-full flex flex-col justify-center items-center">
                  <div className=" h-5/6 flex gap-80">
                    <div className=" m-auto w-[90%] h-full mt-10 p-10 border-greye border-2 rounded-2xl">
                      <div className="text-5xl">Create Congregations</div>
                      <div className="mt-10"></div>

                      <div className=" text-darkgrey mb-7 text-xl font-semibold mt-2">
                        <AddCongregation></AddCongregation>
                      </div>
                    </div>
                    <div className=" m-auto w-[90%] h-full mt-10 p-10 border-greye border-2 rounded-2xl">
                      <div className="text-5xl">View Congregations</div>
                      <div className=" mt-5 font-light text-slate-500">
                        <EditCongregation></EditCongregation>
                      </div>
                      <div className=" text-darkgrey mb-7 text-xl font-semibold flex gap-5 flex-col mt-5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
}
