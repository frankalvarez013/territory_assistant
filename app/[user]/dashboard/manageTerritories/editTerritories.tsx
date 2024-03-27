"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import pinLocation from "../../../public/images/pinLocation.svg";
import edit from "../../../public/images/edit.svg";

export default function EditTerritories(session) {
  const [territories, setTerritories] = useState(null);
  useEffect(() => {
    async function duv() {
      const resUsers = await fetch("/api/territory");
      if (!resUsers.ok) {
        console.error("Failed to fetch user data");
        return;
      }
      const usersData = await resUsers.json();
      setTerritories(usersData);
    }
    duv();
  }, []);
  if (!territories) {
    return <h1>...Checking</h1>;
  }
  return (
    <div className="flex flex-col gap-10 mt-10">
      {territories.map((territory, index) => (
        <a
          href={`manageTerritories/edit/${session.session}/${territory.territoryID}`}
          key={index}
          className="flex items-center justify-between"
        >
          <Image
            src={pinLocation}
            alt="Pin Location"
            className="inline mr-5"
            height={35}
          ></Image>
          <h1 className="inline w-full">Territory - {territory.territoryID}</h1>
          <div className="">
            <Image
              src={edit}
              alt="Edit Symbol"
              className="inline mr-5"
              height={25}
            ></Image>
          </div>
        </a>
      ))}
    </div>
  );
}
