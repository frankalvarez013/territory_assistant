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
  }, [props.userID]);

  if (!user) return <div>Loading user data...</div>;

  return (
    <div className="p-4">
      {user[1].map((element, id) => (
        <a
          key={id}
          href={`/territory/${element.congregationID}/${element.territoryID}`}
          className="hover:underline hover:text-blue-500"
        >
          <div
            key={element.territoryID}
            className="mb-4 p-4 border border-blue-500 rounded-lg shadow-sm"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h3 className="text-lg font-semibold">
                <a
                  href={`/territory/${element.congregationID}/${element.territoryID}`}
                  className="hover:underline hover:text-blue-500"
                >
                  Territory: # {element.territoryID}
                </a>
              </h3>
              <span className="text-sm text-gray-600">Address: {element.location}</span>
            </div>
            <div className="text-sm text-gray-500">
              <div>
                <strong>Assigned Date:</strong>{" "}
                {element.AssignedDate
                  ? new Date(element.AssignedDate).toLocaleDateString("en-US")
                  : "..."}
              </div>
              <div>
                <strong>Expiration Date:</strong>{" "}
                {element.ExperiationDate
                  ? new Date(element.ExperiationDate).toLocaleDateString("en-US")
                  : "..."}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
