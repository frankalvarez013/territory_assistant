import DashboardLayout from "@/app/components/Layout/DashboardLayout";
import Image from "next/image";
import { authOptions } from "@/app/utils/authOptions";
import { CustomSession } from "@/app/types/api";
import { redirect } from "next/navigation";
import TerritoryCheck from "./TerritoryCheck";
import { TerritoryEditAdmin } from "@/app/types/common";
import { getServerSession } from "next-auth";
import TerritoryHeader from "./TerritoryHeader";
export default async function Page({ params }: TerritoryEditAdmin) {
  const session = (await getServerSession(authOptions)) as CustomSession;
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <DashboardLayout>
      <div className="flex flex-col mt-10 lg:justify-center lg:items-center overflow-x-auto">
        <TerritoryHeader territoryID={params.territoryID} congID={params.congID}></TerritoryHeader>

        <TerritoryCheck territoryID={params.territoryID} congID={params.congID}></TerritoryCheck>
      </div>
    </DashboardLayout>
  );
}
