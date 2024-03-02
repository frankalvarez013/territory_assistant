export default async function handleUserChange(territoryId, userId) {
  try {
    const response = await fetch("/api/territory", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ territoryID: territoryId, currentUserID: userId }),
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
