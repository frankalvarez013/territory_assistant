//use zod to check if the isAdmin is true or false "strings"
export default async function fetchEditHouse(
  territoryID,
  congID,
  houseID,
  Direction,
  StreetAd,
  comment,
  observation,
  dateVisited
) {
  try {
    const res = await fetch(
      `/api/house?territoryID=${territoryID}&congregationID=${congID}&houseID=${houseID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Direction,
          StreetAd,
          comment,
          observation,
          dateVisited,
        }),
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.message };
    }
    const data = await res.json();

    return { success: true, data };
  } catch (error) {
    console.error("In EditHouseRow - Failed to edit House Row", error);
    return { success: false, error: error.message };
  }
}
