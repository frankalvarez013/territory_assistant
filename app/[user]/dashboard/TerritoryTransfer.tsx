"use client";
import { useEffect, useState } from "react";
import SelectComponent from "../../components/Interact/selectTerrOwner";
import { TerritoryComment } from "@prisma/client";
export default function TerritoryTransfer(props) {
  const [territories, setTerritories] = useState(null);
  const [users, setUsers] = useState(null);
  const [nullValKey, setNullValKey] = useState(0);
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
      console.log("users", usersData);
      const usersParsedData = usersData.filter((element) => {
        console.log(element.isAdmin);
        return element.isAdmin === false;
      });
      console.log("parsedUsers", usersParsedData);

      setUsers(usersParsedData);
    }
    fetchUserData();
  }, []);
  if (!territories || !users) return <div>Loading territories data...</div>;

  return (
    <table className="w-full m-auto border-collapse text-center">
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
        {console.log(territories)}
        {territories
          .sort((a, b) => a.territoryID - b.territoryID)
          .map((element) => (
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
                {element.currentUser && !element.currentUser.isAdmin ? (
                  <SelectComponent
                    uniqueOption={element.currentUser}
                    options={users}
                    territoryId={element.territoryID}
                    congregationId={element.congregationID}
                  ></SelectComponent>
                ) : (
                  <SelectComponent
                    uniqueOption={{ id: element.currentUser.id, name: "Add a User" }}
                    options={users}
                    territoryId={element.territoryID}
                    congregationId={element.congregationID}
                  ></SelectComponent>
                )}
              </td>
              <td className="border-t border-gray-200 py-4 px-4">
                {new Date(element.AssignedDate).toLocaleDateString("en-US")}
              </td>
              <td className="border-t border-gray-200 py-4 px-4">
                {new Date(element.ExperiationDate).toLocaleDateString("en-US")}
              </td>
              <td className="border-t border-gray-200 py-4 px-4">{element.activity}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
