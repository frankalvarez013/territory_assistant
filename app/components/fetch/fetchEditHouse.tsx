import { useEffect } from "react";

export default async function fetchEditHouse(id) {
  const res = await fetch(`/api/house`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res1 = await res.json();
}
