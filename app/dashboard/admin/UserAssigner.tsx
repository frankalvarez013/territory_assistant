"use client";
import { useEffect, useState } from "react";

export default function TerritoryPreview(props) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`/api/user`);
      if (!response.ok) {
        console.error("Failed to fetch user data");
        return;
      }
      const userData = await response.json();
      setUser(userData);
    }
    fetchUserData();
  }, [props.terrList]);
  if (!user) return <div>Loading user data...</div>;
  console.log(user);
  return (
    <table className="w-full m-auto border-collapse text-center">
      <thead>
        <tr>
          <th className="border-b border-gray-200 py-4 px-4">Territory</th>
          <th className="border-b border-gray-200 py-4 px-4">Publisher</th>
          <th className="border-b border-gray-200 py-4 px-4">Assigned Date</th>
          <th className="border-b border-gray-200 py-4 px-4">
            Expiration Date
          </th>
          <th className="border-b border-gray-200 py-4 px-4">Comments</th>
        </tr>
      </thead>
      <tbody>
        {user.map((element) => (
          <tr key={element.territoryID}>
            <td className="border-t border-gray-200 py-4 px-4">
              {element.user}
            </td>
            <td className="border-t border-gray-200 py-4 px-4">
              {element.user}
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
