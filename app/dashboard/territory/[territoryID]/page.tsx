import DashboardLayout from "@/app/components/DashboardLayout";
import qrcode from "../../../public/images/qrCode.png";
import territory from "../../../public/images/defaultMap.png";
import Image from "next/image";
import TerritoryView from "./TerritoryView";
export default function Page({ params }) {
  return (
    <DashboardLayout>
      <main className="flex flex-col mt-10 justify-center items-center">
        <div className="flex justify-evenly mb-10 items-center gap-20">
          <header className="text-6xl text-center">
            Territory {params.territoryID}
          </header>
          <button className="">
            <Image
              src={qrcode}
              alt="Picture of QR Code Icon"
              width={100}
              height={100}
            ></Image>
          </button>
        </div>

        <Image
          src={territory}
          alt="Picture of Territory"
          width={600}
          height={600}
          className=" m-auto"
        ></Image>
        <div className="mt-28 mb-28">
          <TerritoryView></TerritoryView>
        </div>
      </main>
    </DashboardLayout>
  );
}
