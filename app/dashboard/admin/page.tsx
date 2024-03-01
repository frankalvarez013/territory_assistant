import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UserAssigner from "./UserAssigner";
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
        <div className="w-10/12 h-5/6 flex flex-col">
          <div className="mt-10">
            <div className="text-5xl mb-10">Welcome, {session.user.name}</div>
            <div className="pl-10 py-8 justify-center flex flex-col shadow-2xl rounded-[2rem] shadow-all-angles">
              <div className=" font-light text-slate-500 mb-3">
                Welcome admin, this dashboard provides a view of all members who
                receive territory card assignments.
              </div>
              <ol className="list-decimal ml-5">
                <li>
                  User the dropdown list under Publisher to assign territory
                  cards then update assigned date, the expiration date will auto
                  calculate.
                </li>
                <li>
                  Each territory row will auto fill with the color yellow for
                  assigned not expired territory cards.
                </li>
                <li>Light red for expired territory cards.</li>
                <li>
                  Each territory assignment expires 120 days from the assigned
                  date.
                </li>
                <li>
                  Once a territory expires, the comment column updates with an
                  `Expired comment and the row highlights in light red.`
                </li>
                <li>
                  Available territories for reassignment will be filled wtih
                  light green color. The publisher field is updated with to
                  Available.
                </li>
              </ol>
            </div>
          </div>
          <div className="h-full mt-10 p-10 border-greye border-2 rounded-2xl">
            <div className=" text-darkgrey mb-7 text-xl font-semibold">
              Assigned Territories
            </div>
            <UserAssigner
              terrList={terrList}
              userID={session.user.id}
            ></UserAssigner>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
