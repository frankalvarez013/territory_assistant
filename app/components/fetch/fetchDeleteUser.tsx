import { useEffect, useState } from "react";

export default async function DeleteUser(id) {
  let res1 = await fetch(`/api/user?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await res1.json();

  return res;
}
