// import { hash } from "bcryptjs";

export default async function fetchAddUser(
  name,
  email,
  password,
  congregationID
) {
  let res1 = null;
  // const hashPassword = await hash(password, 12);

  console.log("adding user...");
  try {
    const res = await fetch(`/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, congregationID }),
    });
    res1 = await res.json();
    return res1;
  } catch (error) {
    console.error("Failed to edit user", error);
    return null;
  }
}