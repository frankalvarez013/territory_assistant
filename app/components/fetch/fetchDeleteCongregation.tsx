export default async function DeleteCongregation(id: string) {
  console.log("Invoking DeleteCongregation function");
  try {
    let response = await fetch(`/api/congregation?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return { success: true, data };
  } catch (error) {
    console.error("Failed to delete congregation", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: String(error) }; // Handle other types of errors
    }
  }
}
