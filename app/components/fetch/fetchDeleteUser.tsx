import { useEffect, useState } from "react";
import { User } from "@prisma/client";
export default async function DeleteUser(id: string) {
  console.log("Invoking Func");
  let res1 = await fetch(`/api/user?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("bru");
  const res = await res1.json();
  return res;
}
