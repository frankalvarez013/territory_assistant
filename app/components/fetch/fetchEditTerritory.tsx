export default async function fetchEditTerritory(id) {
  const res = await fetch(`/api/territory`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res1 = await res.json();
}
