"use client";
import { useEffect, useState } from "react";

export default function TerritoryPreview(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchUserData() {
      console.log("um");
      const response = await fetch(`/api/user?id=${props.userID}`);
      if (!response.ok) {
        console.error("Failed to fetch user data");
        return;
      }
      console.log("userid", props.userID);
      const userData = await response.json();
      console.log(userData);
      setUser(userData);
    }
    fetchUserData();
  }, [props.terrList]);
  if (!user) return <div>Loading user data...</div>;
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
        {user[1].map((element) => (
          <tr key={element.territoryID}>
            <td className="border-t border-gray-200 py-4 px-4">
              {element.territoryID}
            </td>
            <td className="border-t border-gray-200 py-4 px-4">
              {element.location}
            </td>
            <td className="border-t border-gray-200 py-4 px-4">
              {element.AssignedDate}
            </td>
            <td className="border-t border-gray-200 py-4 px-4">
              {element.ExperiationDate}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
