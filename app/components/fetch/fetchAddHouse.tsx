//use zod to check if the isAdmin is true or false "strings"
import { House, Observation } from "@prisma/client";
export default async function fetchAddHouse(
  territoryID: number,
  Direction: string,
  StreetAd: string,
  comment: string,
  observation: Observation,
  dateVisited?: Date
) {
  console.log(territoryID, Direction, StreetAd, comment, observation, dateVisited);
  try {
    const res = await fetch(`/api/house`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        territoryID,
        Direction,
        StreetAd,
        comment,
        observation,
        dateVisited,
      }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.message };
    }
    const data = await res.json();

    return { success: true, data };
  } catch (error) {
    console.error("In EditHouseRow - Failed to edit House Row", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: String(error) }; // Handle other types of errors
    }
  }
}
