import { useSession } from "next-auth/react";
import TerritoryGeneralADMIN from "@/app/components/General/TerritoryGeneralADMIN";
import TerritoryGeneralUser from "@/app/components/General/TerritoryGeneralUSER";
import { TerritoryCheckProps, TerritoryEditAdmin } from "@/app/types/common";
import { CustomSession } from "@/app/types/api";
export default function TerritoryCheck(props: TerritoryCheckProps) {
  const { data: session } = useSession() as { data: CustomSession };
  if (session?.user?.isAdmin) {
    return (
      <div className="mt-28 mb-28">
        <TerritoryGeneralADMIN
          congID={props.congID}
          territoryID={props.territoryID}
        ></TerritoryGeneralADMIN>
      </div>
    );
  } else {
    return (
      <div className="mt-28 mb-28">
        <TerritoryGeneralUser
          congID={props.congID}
          territoryID={props.territoryID}
        ></TerritoryGeneralUser>
      </div>
    );
  }
}
