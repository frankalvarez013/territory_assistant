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
    const res1 = await res.json();
    return res1;
  } catch (error) {
    console.error("Failed to edit user", error);
    return null;
  }
}
