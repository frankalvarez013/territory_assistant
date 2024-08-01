"use client";
import { useEffect, useState } from "react";
import SelectComponent from "../../components/Interact/selectTerrOwner";
import { Territory, TerritoryComment, User } from "@prisma/client";
import { ExtendedTerritory } from "@/app/types/common";

export default function TerritoryTransfer() {
  const [territories, setTerritories] = useState<ExtendedTerritory[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);

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
                <tr
                  key={element.territoryID}
                  className={`border-t border-gray-200 ${
                    element.activity == TerritoryComment.Available ? "bg-green-200" : ""
                  }`}
                >
                  <td className="border-t border-gray-200 py-4 px-4 hover:underline hover:to-blue-300">
                    <a href={`/territory/${element.congregationID}/${element.territoryID}`}>
                      {element.territoryID}
                    </a>
                  </td>
                  <td className="border-t border-gray-200 py-4 px-4">
                    <SelectComponent
                      uniqueOption={
                        element.currentUser && !element.currentUser.isAdmin
                          ? element.currentUser
                          : { id: element.currentUser?.id ?? "", name: "Add a User" }
                      }
                      options={users}
                      territoryId={element.territoryID}
                      congregationId={element.congregationID}
                    ></SelectComponent>
                  </td>
                  <td className="border-t border-gray-200 py-4 px-4">
                    {element.AssignedDate
                      ? new Date(element.AssignedDate).toLocaleDateString("en-US")
                      : "..."}
                  </td>
                  <td className="border-t border-gray-200 py-4 px-4">
                    {element.ExperiationDate
                      ? new Date(element.ExperiationDate).toLocaleDateString("en-US")
                      : "..."}
                  </td>
                  <td className="border-t border-gray-200 py-4 px-4">{element.activity}</td>
                </tr>
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
            <div
              key={element.territoryID}
              className={`mb-4 p-4 border rounded-lg min-w-44 ${
                element.activity == TerritoryComment.Available ? "bg-green-200" : ""
              }`}
            >
              <div className="mb-2 flex ">
                <strong>Territory:</strong>
                <a
                  href={`/territory/${element.congregationID}/${element.territoryID}`}
                  className="hover:underline hover:to-blue-300"
                >
                  {element.territoryID}
                </a>
              </div>
              <div className="mb-2">
                <strong>Publisher:</strong>
                <SelectComponent
                  uniqueOption={
                    element.currentUser && !element.currentUser.isAdmin
                      ? element.currentUser
                      : { id: element.currentUser?.id ?? "", name: "Add a User" }
                  }
                  options={users}
                  territoryId={element.territoryID}
                  congregationId={element.congregationID}
                ></SelectComponent>
              </div>
              <div className="mb-2">
                <strong>Assigned Date:</strong>
                {element.AssignedDate
                  ? new Date(element.AssignedDate).toLocaleDateString("en-US")
                  : "..."}
              </div>
              <div className="mb-2">
                <strong>Expiration Date:</strong>
                {element.ExperiationDate
                  ? new Date(element.ExperiationDate).toLocaleDateString("en-US")
                  : "..."}
              </div>
              <div className="mb-2">
                <strong>Comments:</strong> {element.activity}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
