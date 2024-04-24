export default async function editTerritory(
  territoryID,
  congregationID,
  location
) {
  try {
    console.log("inside editTerritory...");
    const response = await fetch("/api/territory", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        territoryID: territoryID,
        congregationID: congregationID,
        location: location,
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
