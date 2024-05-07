//use zod to check if the isAdmin is true or false "strings"
export default async function fetchAddHouse(
  territoryID,
  Direction,
  StreetAd,
  comment,
  observation,
  dateVisited
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
    return { success: false, error: error.message };
  }
}
