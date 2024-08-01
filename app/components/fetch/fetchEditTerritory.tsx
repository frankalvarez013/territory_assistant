export default async function editTerritory(
  territoryID: string,
  congregationID: string,
  location: string
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
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: String(error) }; // Handle other types of errors
    }
  }
}
