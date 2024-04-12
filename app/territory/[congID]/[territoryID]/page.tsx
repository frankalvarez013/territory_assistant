"use client";
import DashboardLayout from "@/app/components/Layout/DashboardLayout";
import qrcode from "@/app/public/images/qrCode.png";
import territory from "@/app/public/images/defaultMap.png";
import Image from "next/image";
import TerritoryGeneralView from "../../../components/General/TerritoryGeneralView";
import QrCodeModal from "./QrCodeModal";
import { useEffect, useState } from "react";
export default function Page({ params }) {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");
  useEffect(() => {
    async function getInfo() {
      const resUsers = await fetch(
        `/api/image?territoryID=${params.territoryID}&congregationID=${params.congID}`
      );
      if (!resUsers.ok) {
        console.error("Failed to fetch user data");
        return;
      }
      const usersData = await resUsers.json();
      setImage(usersData);
    }
    getInfo();
  });
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
              onClick={() => {
                setIsOpen(true);
              }}
            ></Image>
          </button>
        </div>
        <img
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/v${image.version}/${image.publicId}.${image.format}`}
          key={image.publicId}
        />
        <div className="mt-28 mb-28">
          <TerritoryGeneralView
            congID={params.congID}
            territoryID={params.territoryID}
          ></TerritoryGeneralView>
        </div>
        <QrCodeModal
          congregation={params.congID}
          territory={params.territoryID}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        ></QrCodeModal>
      </main>
    </DashboardLayout>
  );
}
