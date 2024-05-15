"use client";
import { useEffect } from "react";

export default function FetchTerritory(id: number) {
  console.log(id);
  useEffect(() => {
    async function brv() {
      const res = await fetch(`/api/territory`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res1 = await res.json();
    }
  });

  return <h1>Bro</h1>;
}
