"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Image as ObjImage } from "@prisma/client";
import { TerritoryCheckProps, TerritoryEditAdmin } from "@/app/types/common";

export default function TerritoryCheck(params: TerritoryCheckProps) {
  const [image, setImage] = useState<ObjImage | null>(null);
  const [qrCode, setQrCode] = useState("");
  console.log("qr st", params.territoryID, params.congID);
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
      const resQRCode = await fetch(
        `https://quickchart.io/qr?text=https://www.territoryassistant.app/territory/${params.congID}/${params.territoryID}`
      );
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
    <>
      <div className="flex justify-evenly mb-10 items-center gap-3 sm:gap-20 flex-wrap">
        <header className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-nowrap sm:pl-11">
          EDIT Territory #{params.territoryID}
        </header>
        <button className=" min-w-16">
          <Image src={qrCode} alt="Picture of QR Code Icon" width={100} height={100}></Image>
        </button>
      </div>
      <img
        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/v${image.version}/${image.publicId}.${image.format}`}
        key={image.publicId}
        alt="oi"
      />
    </>
  );
}
