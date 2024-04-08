// import { hash } from "bcryptjs";

export default async function fetchAddTerritory(location) {
  console.log("INSIDE");
  try {
    const res = await fetch(`/api/territory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location }),
    });
    const res1 = await res.json();
    return res1;
  } catch (error) {
    console.error("Failed to edit user", error);
    return null;
  }
}
