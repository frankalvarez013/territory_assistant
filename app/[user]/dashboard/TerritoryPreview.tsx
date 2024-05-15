"use client";
import { Territory, User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function TerritoryPreview(props: { userID: string }) {
  const [user, setUser] = useState<[User, Territory[]] | null>(null);
  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`/api/user?id=${props.userID}`);
      if (!response.ok) {
        console.error("Failed to fetch user data");
        return;
      }
      const userData = await response.json();
      setUser(userData);
    }
    fetchUserData();
  }, []);
  if (!user) return <div>Loading user data...</div>;
  // console.log("check", user);

  return (
    <table className="w-full m-auto border-collapse text-center">
      <thead>
        <tr>
          <th className="border-b border-gray-200 py-4 px-4">Territory</th>
          <th className="border-b border-gray-200 py-4 px-4">Location</th>
          <th className="border-b border-gray-200 py-4 px-4">Assigned Date</th>
          <th className="border-b border-gray-200 py-4 px-4">Expiration Date</th>
        </tr>
      </thead>
      <tbody>
        {user[1].map((element) => (
          <tr key={element.territoryID}>
            <td className="border-t border-gray-200 py-4 px-4 hover:underline hover:to-blue-300">
              <a href={`/territory/${element.congregationID}/${element.territoryID}`}>
                {element.territoryID}
              </a>
            </td>
            <td className="border-t border-gray-200 py-4 px-4">{element.location}</td>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
