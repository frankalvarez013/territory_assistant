import { useEffect } from "react";
import fetchDeleteRequest from "./fetchDeleteRequest";
export default async function FetchAcceptRequest(
  territoryID,
  houseID,
  congregationID,
  observation,
  comment,
  reqID
) {
  const res = await fetch(`/api/request`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      territoryID: +territoryID,
      houseID: +houseID,
      congregationID: congregationID,
      observation: observation,
      comment: comment,
      approval: true,
    }),
  });
  const res1 = await res.json();
  if (!res.ok) {
    throw new Error("Failed to update territory");
  }
  console.log("Request updated successfully");

  console.log(res1);
  fetchDeleteRequest(reqID);
}
