import DashboardLayout from "@/app/components/DashboardLayout";
import qrcode from "../../../public/images/qrCode.png";
import territory from "../../../public/images/defaultMap.png";
import Image from "next/image";
import TerritoryView from "./TerritoryView";
export default function Page({ params }) {
  return (
    <DashboardLayout>
      <header className="text-6xl">Territory {params.territoryID}</header>
      <button>
        <Image
          src={qrcode}
          alt="Picture of QR Code Icon"
          width={100}
          height={100}
        ></Image>
      </button>
      <Image
        src={territory}
        alt="Picture of Territory"
        width={100}
        height={100}
      ></Image>
      <main>
        <TerritoryView></TerritoryView>
      </main>
    </DashboardLayout>
  );
}
