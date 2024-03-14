"use client";
import { useEffect, useState } from "react";
export default function RequestView(props) {
  const [territory, setTerritory] = useState(null);
  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`/api/user?id=${props.userID}`);
      if (!response.ok) {
        console.error("Failed to fetch territory data");
        return;
      }
      const userData = await response.json();
      setTerritory(userData);
      console.log(territory);
      console.log(props.congID);
      if (territory) {
        console.log("BRO");
      }
    }
    fetchUserData();
  }, []);
  if (!territory) return <div>Loading territory data...</div>;
  return (
    <table className="w-full m-auto border-collapse text-center">
      <thead>
        <tr>
          <th className="border-b border-gray-200 py-4 px-4">Territory</th>
          <th className="border-b border-gray-200 py-4 px-4">Location</th>
          <th className="border-b border-gray-200 py-4 px-4">Assigned Date</th>
          <th className="border-b border-gray-200 py-4 px-4">
            Expiration Date
          </th>
        </tr>
      </thead>
      <tbody>
        {territory[1].map((element) => (
          <tr key={element.territoryID}>
            <td className="border-t border-gray-200 py-4 px-4">
              {element.territoryID}
            </td>
            <td className="border-t border-gray-200 py-4 px-4">
              {element.location}
            </td>
            <td className="border-t border-gray-200 py-4 px-4">
              {new Date(element.AssignedDate).toLocaleDateString("en-US")}
            </td>
            <td className="border-t border-gray-200 py-4 px-4">
              {new Date(element.ExperiationDate).toLocaleDateString("en-US")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
