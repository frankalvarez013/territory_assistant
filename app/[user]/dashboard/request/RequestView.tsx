"use client";
import { useEffect, useState } from "react";
import Approval from "./Approval";
export default function RequestView(props) {
  const [territories, setTerritories] = useState(null);
  const [requests, setRequests] = useState(null);
  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`/api/territory`);
      if (!response.ok) {
        console.error("Failed to fetch territories data");
        return;
      }
      const terrData = await response.json();
      setTerritories(terrData);
      const fetchPromises = terrData.map((territory) =>
        fetch(
          `/api/request?territoryID=${territory.territoryID}&congID=${territory.congregationID}`
        ).then((response) => response.json())
      );
      const allData = await Promise.all(fetchPromises);
      console.log(allData);
      setRequests(allData);
    }
    fetchUserData();
  }, []);
  if (!territories || !requests) {
    console.log(requests);
    return <div>Loading territory data...</div>;
  }
  return territories.map((element, index) => (
    <table key={index} className="w-full m-auto border-collapse text-center">
      <thead>
        <tr>
          <th className="border-b border-gray-200 py-4 px-4">
            Approval Status
          </th>
          <th className="border-b border-gray-200 py-4 px-4">Territory ID</th>

          <th className="border-b border-gray-200 py-4 px-4">House ID</th>
          <th className="border-b border-gray-200 py-4 px-4">Observation</th>
          <th className="border-b border-gray-200 py-4 px-4">Comment</th>
        </tr>
      </thead>
      <tbody>
        {requests[0].map((element) => (
          <tr key={element.id}>
            <td className="border-t border-gray-200 py-4 px-4">
              <Approval
                reqID={element.id}
                territoryID={element.territoryID}
                houseID={element.houseID}
                congregationID={element.congregationID}
                observation={element.observation}
                comment={element.comment}
              ></Approval>
            </td>
            <td className="border-t border-gray-200 py-4 px-4">
              {element.territoryID}
            </td>
            <td className="border-t border-gray-200 py-4 px-4">
              {element.houseID}
            </td>
            <td className="border-t border-gray-200 py-4 px-4">
              {element.observation}
            </td>
            <td className="border-t border-gray-200 py-4 px-4">
              {element.comment}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ));
}
