import { useEffect } from "react";

export default async function fetchDeleteRequest(id) {
  const res = await fetch(`/api/request?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res1 = await res.json();
  if (!res.ok) {
    throw new Error("Failed to DELETE request");
  }
  console.log("Request DELETED successfully");
  console.log(res1);
}
