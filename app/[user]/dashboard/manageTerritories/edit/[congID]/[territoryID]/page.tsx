"use client";
import DashboardLayout from "@/app/components/Layout/DashboardLayout";
import qrcode from "@/app/public/images/qrCode.png";
import territory from "@/app/public/images/defaultMap.png";
import Image from "next/image";
import TerritoryGeneralView from "@/app/components/General/TerritoryGeneralADMIN";
import Upload from "./upload";
import { useEffect, useState } from "react";
export default function Page({ params }) {
  const [image, setImage] = useState(null);
  useEffect(() => {
    async function duv() {
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
    duv();
  }, []);
  if (!image) {
    return <h1>Loading...</h1>;
  }
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
        <img
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/v${image.version}/${image.publicId}.${image.format}`}
          key={image.publicId}
        />
        <Upload
          congregationID={params.congID}
          territoryID={params.territoryID}
        ></Upload>
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
