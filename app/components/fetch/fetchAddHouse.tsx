//use zod to check if the isAdmin is true or false "strings"
export default async function fetchAddHouse(
  territoryID,
  Direction,
  StreetAd,
  comment,
  observation,
  dateVisited
) {
  console.log(
    territoryID,
    Direction,
    StreetAd,
    comment,
    observation,
    dateVisited
  );
  const res = await fetch(`/api/house`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      territoryID,
      Direction,
      StreetAd,
      comment,
      observation,
      dateVisited,
    }),
  });
  const res1 = await res.json();
  console.log(res1);
}
