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
