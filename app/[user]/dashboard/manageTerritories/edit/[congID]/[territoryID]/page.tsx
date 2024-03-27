"use client";
import DashboardLayout from "@/app/components/Layout/DashboardLayout";
import qrcode from "@/app/public/images/qrCode.png";
import territory from "@/app/public/images/defaultMap.png";
import Image from "next/image";
import TerritoryGeneralView from "@/app/components/General/TerritoryGeneralADMIN";
export default function Page({ params }) {
  return (
    <DashboardLayout>
      <main className="flex flex-col mt-10 justify-center items-center">
        <div className="flex justify-evenly mb-10 items-center gap-20">
          <header className="text-6xl text-center">
            EDIT Territory {params.territoryID}
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
          <TerritoryGeneralView
            congID={params.congID}
            territoryID={params.territoryID}
          ></TerritoryGeneralView>
        </div>
      </main>
    </DashboardLayout>
  );
}
