import { useEffect, useState } from "react";

export default async function fetchEditUser(id, updateInfo) {
  let res1 = null;
  console.log("updating", id, updateInfo);
  const obj: { [key: string]: any } = {};
  Object.keys(updateInfo).forEach((key) => {
    console.log(key);
    if (updateInfo[key] || (key === "isAdmin" && updateInfo[key] === false)) {
      console.log("SHOULD BE gOING FRU");
      obj[key] = updateInfo[key];
    }
  });
  console.log("?", obj);
  try {
    const res = await fetch(`/api/user?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    res1 = await res.json();
    return res1;
  } catch (error) {
    console.error("Failed to edit user", error);
    return null;
  }
}
