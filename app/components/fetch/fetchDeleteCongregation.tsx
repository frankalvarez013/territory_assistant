export default async function DeleteCongregation(id) {
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
    return { success: false, error: error.message };
  }
}
