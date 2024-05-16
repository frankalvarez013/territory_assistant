"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, createContext } from "react";
import Approval from "./Approval";
import { useStateContext } from "./StateContext";
import { CustomSession } from "@/app/types/api";
import { PrivelegeCheck } from "@/app/types/common";
export default function RequestView(props: PrivelegeCheck) {
  const context = useStateContext();
  const { data: session } = useSession() as { data: CustomSession };
  const { territories, requests, updateItems } = context;
  useEffect(() => {
    updateItems();
  }, [updateItems]);

  if (!context) {
    return <div>Loading...</div>;
  }
  // Check if territories or requests are not loaded or if requests array is empty
  if (!territories || !requests) {
    return <div>Loading Request data...</div>;
  }

  // Now we are sure requests array is not empty, but ensure each item is as expected
  const territoriesResults = territories.map((element, index) => {
    // Assuming each territory corresponds to a set of requests
    const territoryRequests = requests[index];
    // Safely check if territoryRequests is not undefined and is an array
    if (!territoryRequests || !Array.isArray(territoryRequests)) {
      return null; // or some placeholder indicating no data for this territory
    }
    if (element.currentUser === null || element.currentUser.id !== session?.user!.id) {
      return null;
    }

    return (
      <div key={index} className="mb-8">
        <div className="text-2xl font-medium text-gray-500">Territory {element.territoryID}</div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <table key={index} className="w-full m-auto border-collapse text-center">
            <thead>
              <tr>
                <th className="border-b border-gray-200 py-4 px-4">Approval Status</th>
                <th className="border-b border-gray-200 py-4 px-4">House ID</th>
                <th className="border-b border-gray-200 py-4 px-4">Observation</th>
                <th className="border-b border-gray-200 py-4 px-4">Comment</th>
              </tr>
            </thead>
            <tbody>
              {territoryRequests.map((request) => (
                <tr key={request.id}>
                  <td className="border-t border-gray-200 py-4 px-4">
                    <Approval
                      reqID={request.id}
                      territoryID={request.territoryID}
                      houseID={request.houseID}
                      congregationID={request.congregationID}
                      observation={request.observation}
                      comment={request.comment}
                    />
                  </td>
                  <td className="border-t border-gray-200 py-4 px-4">{request.houseID}</td>
                  <td className="border-t border-gray-200 py-4 px-4">{request.observation}</td>
                  <td className="border-t border-gray-200 py-4 px-4">{request.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          {territoryRequests.map((request) => (
            <div key={request.id} className="mb-4 p-4 border rounded-lg">
              <div className="mb-2">
                <strong>Approval Status:</strong>
                <Approval
                  reqID={request.id}
                  territoryID={request.territoryID}
                  houseID={request.houseID}
                  congregationID={request.congregationID}
                  observation={request.observation}
                  comment={request.comment}
                />
              </div>
              <div className="mb-2">
                <strong>House ID:</strong> {request.houseID}
              </div>
              <div className="mb-2">
                <strong>Observation:</strong> {request.observation}
              </div>
              <div className="mb-2">
                <strong>Comment:</strong> {request.comment}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  });

  if (territoriesResults.every((result) => result === null || result === undefined)) {
    return (
      <div>
        Looks like you have no territories to accept Requests! Contact your administrator if you
        need assistance
      </div>
    );
  } else {
    return territoriesResults;
  }
}
