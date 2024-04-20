import { useEffect, useState } from "react";

export default async function fetchEditCongregation(id, updateInfo) {
  let res1 = null;
  const obj: { [key: string]: any } = {};
  Object.keys(updateInfo).forEach((key) => {
    if (updateInfo[key]) {
      obj[key] = updateInfo[key];
    }
  });
  console.log(obj);
  try {
    const res = await fetch(`/api/congregation?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    res1 = await res.json();
    return res1;
  } catch (error) {
    console.error("Failed to edit congregation", error);
    return null;
  }
}
