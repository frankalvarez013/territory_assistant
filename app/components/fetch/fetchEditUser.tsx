import { useEffect, useState } from "react";
import { User } from "@prisma/client";
export default async function fetchEditUser(id: string, updateInfo: any) {
  let res1 = null;
  console.log("updating", id, updateInfo);
  const obj: { [key: string]: any } = {};
  Object.keys(updateInfo).forEach((key) => {
    console.log(key);
    if (updateInfo[key] || (key === "isAdmin" && updateInfo[key] === false)) {
      console.log("Converting to OBJ...");
      obj[key] = updateInfo[key];
    }
  });
  console.log("Edit User Goin Thru", obj);
  try {
    const res = await fetch(`/api/user?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
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
