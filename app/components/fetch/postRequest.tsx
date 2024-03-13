export default async function postRequest(
  houseID: number,
  territoryID: number,
  congregationID: string,
  userID:,
  observation,
  comment
) {
  console.log(
    houseID,
    territoryID,
    congregationID,
    userID,
    observation,
    comment
  );
  try {
    const response = await fetch("/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        territoryID: territoryID,
        currentUserID: userID,
        congregationID: congregationID,
        houseID: houseID,
        observation: observation,
        comment: comment,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update territory");
    }

    // Optionally, refresh your local data to reflect the change
    console.log("Territory updated successfully");
  } catch (error) {
    console.error(error);
  }
}
