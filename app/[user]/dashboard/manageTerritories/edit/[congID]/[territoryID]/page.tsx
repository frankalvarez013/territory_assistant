"use client";
import DashboardLayout from "@/app/components/Layout/DashboardLayout";
import Image from "next/image";
import TerritoryGeneralADMIN from "@/app/components/General/TerritoryGeneralADMIN";
import Upload from "./upload";
import { useEffect, useState } from "react";
import TerritoryCheck from "./TerritoryCheck";
import { TerritoryEditAdmin } from "@/app/types/common";
import { Image as ObjImage } from "@prisma/client";
export default function Page(params: TerritoryEditAdmin) {
  const [image, setImage] = useState<ObjImage | null>(null);
  const [qrCode, setQrCode] = useState("");
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
      const resQRCode = await fetch(`https://quickchart.io/qr?text=http://localhost:3000/`);
      const imageBlob = await resQRCode.blob(); // Process response as a Blob
      const imageUrl = URL.createObjectURL(imageBlob); // Create a local URL to the blob object
      setQrCode(imageUrl);
      // Now you can use 'imageUrl' as the source for an <img> element in your HTML
    }
    duv();
  }, []);
  if (!image) {
    return <h1>Loading...</h1>;
  }
  console.log(qrCode);
  return (
    <DashboardLayout>
      <main className="flex flex-col mt-10 justify-center items-center">
        <div className="flex justify-evenly mb-10 items-center gap-20">
          <header className="text-6xl text-center">EDIT Territory {params.territoryID}</header>
          <button className="">
            <Image src={qrCode} alt="Picture of QR Code Icon" width={100} height={100}></Image>
          </button>
        </div>
        <img
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/v${image.version}/${image.publicId}.${image.format}`}
          key={image.publicId}
        />

        <TerritoryCheck territoryID={params.territoryID} congID={params.congID}></TerritoryCheck>
      </main>
    </DashboardLayout>
  );
}
