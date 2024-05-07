// import { hash } from "bcryptjs";

export default async function fetchAddCongregation(congregationName, address) {
  console.log("INSIDE");
  try {
    const res = await fetch(`/api/congregation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ congregationName, address }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.message };
    }
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error("In fetchAddUser - Failed to edit user", error);
    return { success: false, error: error.message };
  }
}
