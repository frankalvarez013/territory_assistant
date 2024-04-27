import { hash } from "bcryptjs";

export default async function fetchAddUser(
  name,
  email,
  password,
  congregationID,
  Role,
  isAdmin = false
) {
  let res1 = null;
  const hashPassword = await hash(password, 12);

  console.log("invoked add user... Look at what we want: ", Role);
  try {
    const res = await fetch(`/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password: hashPassword,
        congregationID,
        Role,
        isAdmin,
      }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("done");
    return { success: true, data };
  } catch (error) {
    console.error("Failed to edit user", error);
    return { success: false, error: error.message };
  }
}
