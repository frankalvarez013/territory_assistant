"use client";
import { useEffect, useState } from "react";

export default function DeleteUser(id) {
  const [res, setRes] = useState(null);
  useEffect(() => {
    async function brv() {
      const res = await fetch(`/api/user?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res1 = await res.json();
      setRes(res1);
    }
  });
  return res;
}
