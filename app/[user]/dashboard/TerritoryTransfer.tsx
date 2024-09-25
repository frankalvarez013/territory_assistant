"use client";
import { useEffect, useState } from "react";
import SelectComponent from "../../components/Interact/selectTerrOwner";
import { Territory, TerritoryComment, User } from "@prisma/client";
import { ExtendedTerritory } from "@/app/types/common";
import patchTerrOwner from "../../components/fetch/patchTerrOwner";
import TerritorySlot from "./TerritorySlot";
import TerritoryCol from "./TerritoryCol";
export default function TerritoryTransfer() {
  const [territories, setTerritories] = useState<ExtendedTerritory[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [date, setDate] = useState({});
  const [dateLength, setDateLength] = useState("30");
  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`/api/territory`);
      if (!response.ok) {
        console.error("Failed to fetch territories data");
        return;
      }
      const terrData = await response.json();
      setTerritories(terrData);

      const resUsers = await fetch("/api/user");
      if (!resUsers.ok) {
        console.error("Failed to fetch user data");
        return;
      }
      const usersData = await resUsers.json();
      const usersParsedData = usersData.filter((element: User) => !element.isAdmin);

      setUsers(usersParsedData);
    }
    fetchUserData();
  }, []);
  if (!territories || !users) return <div>Loading territories data...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-16 justify-center items-center">
        <div className="basis-2/3 font-mono text-gray-400">
          Change The Amount of Days a Publisher Can Hold a Territory. Will Only Be Applied Once You
          Change The Assigned Date
        </div>
        <div className=" basis-1/3">
          <label htmlFor="quantity">Date Length:</label>
          <input
            className="border-2  border-gray-200 ml-4 w-10"
            type="number"
            value={dateLength}
            onChange={(e) => {
              setDateLength(e.target.value);
            }}
            placeholder="30"
          />
        </div>
      </div>
      <div className="hidden md:block h-full">
        <table className="w-full border-collapse text-center h-full">
          <thead>
            <tr>
              <th className="border-b border-gray-200 py-4 px-4">Territory</th>
              <th className="border-b border-gray-200 py-4 px-4">Publisher</th>
              <th className="border-b border-gray-200 py-4 px-4">Assigned Date</th>
              <th className="border-b border-gray-200 py-4 px-4">Expiration Date</th>
              <th className="border-b border-gray-200 py-4 px-4">Comments</th>
            </tr>
          </thead>
          <tbody>
            {territories
              .sort((a, b) => {
                const numA = parseInt(a.territoryID, 10);
                const numB = parseInt(b.territoryID, 10);

                if (numA !== numB) {
                  return numA - numB;
                }

                return a.territoryID.localeCompare(b.territoryID);
              })
              .map((element: ExtendedTerritory) => (
                <TerritoryCol
                  key={element.territoryID}
                  element={element}
                  users={users}
                  dateLength={dateLength}
                />
              ))}
          </tbody>
        </table>
      </div>
      <div className="block md:hidden min-w-full ">
        {territories
          .sort((a, b) => {
            const numA = parseInt(a.territoryID, 10);
            const numB = parseInt(b.territoryID, 10);

            if (numA !== numB) {
              return numA - numB;
            }

            return a.territoryID.localeCompare(b.territoryID);
          })
          .map((element: ExtendedTerritory) => (
            <TerritorySlot
              key={element.territoryID}
              element={element}
              users={users}
              dateLength={dateLength}
            />
          ))}
      </div>
    </div>
  );
}
