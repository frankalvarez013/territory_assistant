"use client";
import DashboardLayout from "@/app/components/DashboardLayout";
import qrcode from "../../../public/images/qrCode.png";
import territory from "../../../public/images/defaultMap.png";
import Image from "next/image";
import TerritoryView from "./TerritoryView";
import { useEffect, useState } from "react";
export default function Page({ params }) {
  const [val, setVal] = useState(null);
  useEffect(() => {
    async function brv() {
      const res = await fetch(`/api/territory?terrId=${params.territoryID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res1 = await res.json();
      setVal(res1);
      return res1;
    }
    brv();
  }, []);
  console.log(val);

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
          {val ? (
            <TerritoryView territory={val}></TerritoryView>
          ) : (
            <div>Loading territory data...</div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}
