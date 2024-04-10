"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import pinLocation from "../../../public/images/pinLocation.svg";
import edit from "../../../public/images/edit.svg";

export default function EditTerritories(props) {
  const [territories, setTerritories] = useState(null);
  const { data: session1, status } = useSession();
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
  const territoryResults = territories
    .sort((a, b) => a.territoryID - b.territoryID)
    .map((territory, index) => {
      if (territory.currentUser.id !== props.userID) {
        return;
      }
      return (
        <a
          href={`manageTerritories/edit/${props.congID}/${territory.territoryID}`}
          key={index}
          className="flex items-center justify-between"
        >
          <Image
            src={pinLocation}
            alt="Pin Location"
            className="inline mr-5"
            height={35}
          ></Image>
          <h1 className="inline w-full">
            Territory {territory.territoryID} - {territory.location}
          </h1>
          <div className="">
            <Image
              src={edit}
              alt="Edit Symbol"
              className="inline mr-5"
              height={25}
            ></Image>
          </div>
        </a>
      );
    });
  if (
    territoryResults.every((result) => result === null || result === undefined)
  ) {
    return (
      <div className="font-extralight mt-5">
        Looks like you have no assigned territories! Contact your administrator
        if you need assistance
      </div>
    );
  } else {
    return territoryResults;
  }
}
