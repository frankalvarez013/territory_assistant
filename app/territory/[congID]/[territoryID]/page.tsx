"use client";
import DashboardLayout from "@/app/components/Layout/DashboardLayout";
import qrcode from "@/app/public/images/qrCode.png";
import territory from "@/app/public/images/defaultMap.png";
import Image from "next/image";
import TerritoryGeneralView from "../../../components/General/TerritoryGeneralView";
import QrCodeModal from "./QrCodeModal";
import { useEffect, useRef, useState } from "react";
import { TerritoryEditAdmin, TerritoryParams } from "@/app/types/common";
import { Image as Imaage } from "@prisma/client";
import "./styles.css";
export default function Page({ params }: TerritoryParams) {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<Imaage>({
    territoryID: "0", // Assuming `0` can be a default placeholder value
    congregationID: "",
    publicId: "",
    format: "",
    version: "",
  });
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
      <div className="flex flex-col mt-10 lg:justify-center lg:items-center w-full overflow-auto">
        <div className="flex justify-evenly mb-10 items-center gap-20">
          <header className="text-5xl md:text-5xl lg:text-6xl font-bold text-center text-nowrap pl-11">
            Territory #{params.territoryID}
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
          alt="f"
          className="w-[40rem] m-auto"
        />
        <div className="mt-28 mb-28 px-10 overflow-x-auto scroll-container ">
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
      </div>
    </DashboardLayout>
  );
}
