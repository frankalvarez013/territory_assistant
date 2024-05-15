import { hash } from "bcryptjs";
import { Role, User } from "@prisma/client";
export default async function fetchAddUser(
  name: string,
  email: string,
  password: string,
  congregationID: string,
  Role: Role,
  isAdmin = false
) {
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
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: String(error) }; // Handle other types of errors
    }
  }
}
