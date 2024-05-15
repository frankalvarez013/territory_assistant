import { Congregation } from "@prisma/client";
import { useEffect, useState } from "react";

export default async function fetchEditCongregation(id: string, updateInfo: any) {
  let res1 = null;
  const obj: { [key: string]: any } = {};
  console.log(updateInfo);
  Object.keys(updateInfo).forEach((key) => {
    if (updateInfo[key]) {
      obj[key] = updateInfo[key];
    }
  });
  try {
    const res = await fetch(`/api/congregation?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("done");
    return { success: true, data };
  } catch (error) {
    console.error("Failed to edit congregation", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: String(error) }; // Handle other types of errors
    }
  }
}
