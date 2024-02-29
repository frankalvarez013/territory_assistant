"use client";
import { useEffect, useState } from "react";

export default function UserAssigner(props) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUserData() {
      console.log("um");
      const response = await fetch(`/api/user?id=${props.userID}`);
      if (!response.ok) {
        console.error("Failed to fetch user data");
        return;
      }
      const userData = await response.json();
      setUser(userData);
    }
    fetchUserData();
  }, [props.terrList]);
  const date = new Date();
  const normalDate = date.toLocaleDateString("en-US", {
    weekday: "long", // "Monday"
    year: "numeric", // "2024"
    month: "long", // "February"
    day: "numeric", // "27"
  });

  console.log(normalDate);
  if (!user) return <div>Loading user data...</div>;
  console.log(user[1][0]);
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
