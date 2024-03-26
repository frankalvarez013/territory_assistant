"use client";
import { useEffect, useState } from "react";

export default function GetCongregation() {
  const [res, setRes] = useState(null);
  useEffect(() => {
    async function brv() {
      const res = await fetch(`/api/congregation`, {
        method: "GET",
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
