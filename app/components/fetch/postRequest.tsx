import { Observation } from "@prisma/client";

export default async function postRequest(
  houseID: number,
  territoryID: number,
  congregationID: string,
  observation: string,
  comment: string
) {
  console.log(houseID, territoryID, congregationID, observation, comment);
  try {
    const response = await fetch("/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        territoryID: territoryID,
        congregationID: congregationID,
        houseID: houseID,
        observation: observation,
        comment: comment,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create Request");
    }

    // Optionally, refresh your local data to reflect the change
    console.log("Request created successfully");
  } catch (error) {
    console.error(error);
  }
}
